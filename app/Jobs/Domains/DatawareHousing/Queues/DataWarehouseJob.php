<?php

namespace App\Jobs\Domains\DatawareHousing\Queues;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;
use Throwable;

class DataWarehouseJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    /**
     * Number of retries.
     */
    public int $tries = 5;

    /**
     * Retry delay in seconds.
     */
    public array $backoff = [30, 60, 120, 300];

    public function __construct(
        public string $interaction,
        public string $hl7,
        public array $metadata = []
    ) {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $connection = new AMQPStreamConnection(
            config('rabbitmq.host'),
            config('rabbitmq.port'),
            config('rabbitmq.username'),
            config('rabbitmq.password'),
            config('rabbitmq.vhost', '/')
        );

        $channel = $connection->channel();

        $exchange = config('rabbitmq.exchange', 'clinical.interactions');

        $channel->exchange_declare(
            $exchange,
            'topic',
            false,
            true,
            false
        );

        $payload = [
            'message_id' => (string) str()->uuid(),
            'interaction' => $this->interaction,
            'timestamp' => now()->toIso8601String(),
            'metadata' => $this->metadata,
            'hl7' => $this->hl7,
        ];

        $message = new AMQPMessage(
            json_encode($payload),
            [
                'content_type' => 'application/json',
                'delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT,
            ]
        );

        $channel->basic_publish(
            $message,
            $exchange,
            $this->interaction
        );

        $channel->close();
        $connection->close();
    }

    /**
     * Called after all retries fail.
     */
    public function failed(Throwable $exception): void
    {
        logger()->error('Data warehouse publish failed', [
            'interaction' => $this->interaction,
            'error' => $exception->getMessage(),
            'metadata' => $this->metadata,
        ]);
    }
}
