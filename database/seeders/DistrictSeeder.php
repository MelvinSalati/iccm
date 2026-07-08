<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DistrictSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('districts')->truncate();
        Schema::enableForeignKeyConstraints();

        // Get province IDs
        $provinces = DB::table('provinces')->get()->keyBy('code');

        $districts = [
            // Central Province
            ['province_code' => 'CE', 'name' => 'Chibombo'],
            ['province_code' => 'CE', 'name' => 'Chisamba'],
            ['province_code' => 'CE', 'name' => 'Chitambo'],
            ['province_code' => 'CE', 'name' => 'Kabwe'],
            ['province_code' => 'CE', 'name' => 'Kapiri-Mposhi'],
            ['province_code' => 'CE', 'name' => 'Luano'],
            ['province_code' => 'CE', 'name' => 'Mkushi'],
            ['province_code' => 'CE', 'name' => 'Mumbwa'],
            ['province_code' => 'CE', 'name' => 'Ngabwe'],
            ['province_code' => 'CE', 'name' => 'Serenje'],
            ['province_code' => 'CE', 'name' => 'Shibuyunji'],

            // Copperbelt Province
            ['province_code' => 'CB', 'name' => 'Chililabombwe'],
            ['province_code' => 'CB', 'name' => 'Chingola'],
            ['province_code' => 'CB', 'name' => 'Kalulushi'],
            ['province_code' => 'CB', 'name' => 'Kitwe'],
            ['province_code' => 'CB', 'name' => 'Luanshya'],
            ['province_code' => 'CB', 'name' => 'Lufwanyama'],
            ['province_code' => 'CB', 'name' => 'Masaiti'],
            ['province_code' => 'CB', 'name' => 'Mpongwe'],
            ['province_code' => 'CB', 'name' => 'Mufulira'],
            ['province_code' => 'CB', 'name' => 'Ndola'],

            // Eastern Province
            ['province_code' => 'EA', 'name' => 'Chadiza'],
            ['province_code' => 'EA', 'name' => 'Chama'],
            ['province_code' => 'EA', 'name' => 'Chasefu'],
            ['province_code' => 'EA', 'name' => 'Chipangali'],
            ['province_code' => 'EA', 'name' => 'Chipata'],
            ['province_code' => 'EA', 'name' => 'Kasenengwa'],
            ['province_code' => 'EA', 'name' => 'Katete'],
            ['province_code' => 'EA', 'name' => 'Lumezi'],
            ['province_code' => 'EA', 'name' => 'Lundazi'],
            ['province_code' => 'EA', 'name' => 'Lusangazi'],
            ['province_code' => 'EA', 'name' => 'Mambwe'],
            ['province_code' => 'EA', 'name' => 'Nyimba'],
            ['province_code' => 'EA', 'name' => 'Petauke'],
            ['province_code' => 'EA', 'name' => 'Sinda'],
            ['province_code' => 'EA', 'name' => 'Vubwi'],

            // Luapula Province
            ['province_code' => 'LP', 'name' => 'Chembe'],
            ['province_code' => 'LP', 'name' => 'Chienge'],
            ['province_code' => 'LP', 'name' => 'Chifunabuli'],
            ['province_code' => 'LP', 'name' => 'Chipili'],
            ['province_code' => 'LP', 'name' => 'Kawambwa'],
            ['province_code' => 'LP', 'name' => 'Lunga'],
            ['province_code' => 'LP', 'name' => 'Mansa'],
            ['province_code' => 'LP', 'name' => 'Milenge'],
            ['province_code' => 'LP', 'name' => 'Mwansabombwe'],
            ['province_code' => 'LP', 'name' => 'Mwense'],
            ['province_code' => 'LP', 'name' => 'Nchelenge'],
            ['province_code' => 'LP', 'name' => 'Samfya'],

            // Lusaka Province
            ['province_code' => 'LS', 'name' => 'Chilanga'],
            ['province_code' => 'LS', 'name' => 'Chongwe'],
            ['province_code' => 'LS', 'name' => 'Kafue'],
            ['province_code' => 'LS', 'name' => 'Luangwa'],
            ['province_code' => 'LS', 'name' => 'Lusaka'],
            ['province_code' => 'LS', 'name' => 'Rufunsa'],

            // Muchinga Province
            ['province_code' => 'MU', 'name' => 'Chinsali'],
            ['province_code' => 'MU', 'name' => 'Isoka'],
            ['province_code' => 'MU', 'name' => 'Kanchibiya'],
            ['province_code' => 'MU', 'name' => 'Lavushi Manda'],
            ['province_code' => 'MU', 'name' => 'Mafinga'],
            ['province_code' => 'MU', 'name' => 'Mpika'],
            ['province_code' => 'MU', 'name' => 'Nakonde'],
            ['province_code' => 'MU', 'name' => 'Shiwang\'andu'],

            // Northern Province
            ['province_code' => 'NO', 'name' => 'Chilubi'],
            ['province_code' => 'NO', 'name' => 'Kaputa'],
            ['province_code' => 'NO', 'name' => 'Kasama'],
            ['province_code' => 'NO', 'name' => 'Lunte'],
            ['province_code' => 'NO', 'name' => 'Lupososhi'],
            ['province_code' => 'NO', 'name' => 'Luwingu'],
            ['province_code' => 'NO', 'name' => 'Mbala'],
            ['province_code' => 'NO', 'name' => 'Mporokoso'],
            ['province_code' => 'NO', 'name' => 'Mpulungu'],
            ['province_code' => 'NO', 'name' => 'Mungwi'],
            ['province_code' => 'NO', 'name' => 'Nsama'],
            ['province_code' => 'NO', 'name' => 'Senga Hill'],

            // North-Western Province
            ['province_code' => 'NW', 'name' => 'Chavuma'],
            ['province_code' => 'NW', 'name' => 'Ikelenge'],
            ['province_code' => 'NW', 'name' => 'Kabompo'],
            ['province_code' => 'NW', 'name' => 'Kalumbila'],
            ['province_code' => 'NW', 'name' => 'Kasempa'],
            ['province_code' => 'NW', 'name' => 'Manyinga'],
            ['province_code' => 'NW', 'name' => 'Mufumbwe'],
            ['province_code' => 'NW', 'name' => 'Mushindano'],
            ['province_code' => 'NW', 'name' => 'Mwinilunga'],
            ['province_code' => 'NW', 'name' => 'Solwezi'],
            ['province_code' => 'NW', 'name' => 'Zambezi'],

            // Southern Province
            ['province_code' => 'SO', 'name' => 'Chikankata'],
            ['province_code' => 'SO', 'name' => 'Chirundu'],
            ['province_code' => 'SO', 'name' => 'Choma'],
            ['province_code' => 'SO', 'name' => 'Gwembe'],
            ['province_code' => 'SO', 'name' => 'Itezhi-Tezhi'],
            ['province_code' => 'SO', 'name' => 'Kalomo'],
            ['province_code' => 'SO', 'name' => 'Kazungula'],
            ['province_code' => 'SO', 'name' => 'Livingstone'],
            ['province_code' => 'SO', 'name' => 'Mazabuka'],
            ['province_code' => 'SO', 'name' => 'Monze'],
            ['province_code' => 'SO', 'name' => 'Namwala'],
            ['province_code' => 'SO', 'name' => 'Pemba'],
            ['province_code' => 'SO', 'name' => 'Siavonga'],
            ['province_code' => 'SO', 'name' => 'Sinazongwe'],
            ['province_code' => 'SO', 'name' => 'Zimba'],

            // Western Province
            ['province_code' => 'WE', 'name' => 'Kalabo'],
            ['province_code' => 'WE', 'name' => 'Kaoma'],
            ['province_code' => 'WE', 'name' => 'Limulunga'],
            ['province_code' => 'WE', 'name' => 'Luampa'],
            ['province_code' => 'WE', 'name' => 'Lukulu'],
            ['province_code' => 'WE', 'name' => 'Mitete'],
            ['province_code' => 'WE', 'name' => 'Mongu'],
            ['province_code' => 'WE', 'name' => 'Mulobezi'],
            ['province_code' => 'WE', 'name' => 'Mwandi'],
            ['province_code' => 'WE', 'name' => 'Nalolo'],
            ['province_code' => 'WE', 'name' => 'Nkeyema'],
            ['province_code' => 'WE', 'name' => 'Senanga'],
            ['province_code' => 'WE', 'name' => 'Sesheke'],
            ['province_code' => 'WE', 'name' => 'Shang\'ombo'],
            ['province_code' => 'WE', 'name' => 'Sikongo'],
            ['province_code' => 'WE', 'name' => 'Sioma'],
        ];

        foreach ($districts as $district) {
            DB::table('districts')->insert([
                'province_id' => $provinces[$district['province_code']]->id,
                'name' => $district['name'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('✅ Districts seeded successfully! Total: ' . count($districts));
    }
}
