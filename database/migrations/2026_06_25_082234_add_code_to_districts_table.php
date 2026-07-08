<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('districts');

        Schema::create('districts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('province_id')->constrained('provinces')->onDelete('cascade');
            $table->string('name', 100);
            $table->string('code', 20)->unique();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('name');
            $table->index('province_id');
            $table->index('code');
            $table->unique(['province_id', 'name']);
        });

        // Insert all districts with codes
        $this->insertDistricts();
    }

    private function insertDistricts(): void
    {
        $provinces = DB::table('provinces')->get()->keyBy('code');

        $districts = [
            // Central Province
            ['province_code' => 'CE', 'name' => 'Chibombo', 'code' => 'CE-CHI'],
            ['province_code' => 'CE', 'name' => 'Chisamba', 'code' => 'CE-CSA'],
            ['province_code' => 'CE', 'name' => 'Chitambo', 'code' => 'CE-CTB'],
            ['province_code' => 'CE', 'name' => 'Kabwe', 'code' => 'CE-KAB'],
            ['province_code' => 'CE', 'name' => 'Kapiri-Mposhi', 'code' => 'CE-KAP'],
            ['province_code' => 'CE', 'name' => 'Luano', 'code' => 'CE-LUA'],
            ['province_code' => 'CE', 'name' => 'Mkushi', 'code' => 'CE-MKU'],
            ['province_code' => 'CE', 'name' => 'Mumbwa', 'code' => 'CE-MUM'],
            ['province_code' => 'CE', 'name' => 'Ngabwe', 'code' => 'CE-NGA'],
            ['province_code' => 'CE', 'name' => 'Serenje', 'code' => 'CE-SER'],
            ['province_code' => 'CE', 'name' => 'Shibuyunji', 'code' => 'CE-SHI'],

            // Copperbelt Province
            ['province_code' => 'CB', 'name' => 'Chililabombwe', 'code' => 'CB-CLB'],
            ['province_code' => 'CB', 'name' => 'Chingola', 'code' => 'CB-CHI'],
            ['province_code' => 'CB', 'name' => 'Kalulushi', 'code' => 'CB-KAL'],
            ['province_code' => 'CB', 'name' => 'Kitwe', 'code' => 'CB-KIT'],
            ['province_code' => 'CB', 'name' => 'Luanshya', 'code' => 'CB-LUA'],
            ['province_code' => 'CB', 'name' => 'Lufwanyama', 'code' => 'CB-LUF'],
            ['province_code' => 'CB', 'name' => 'Masaiti', 'code' => 'CB-MAS'],
            ['province_code' => 'CB', 'name' => 'Mpongwe', 'code' => 'CB-MPO'],
            ['province_code' => 'CB', 'name' => 'Mufulira', 'code' => 'CB-MUF'],
            ['province_code' => 'CB', 'name' => 'Ndola', 'code' => 'CB-NDO'],

            // Eastern Province
            ['province_code' => 'EA', 'name' => 'Chadiza', 'code' => 'EA-CHA'],
            ['province_code' => 'EA', 'name' => 'Chama', 'code' => 'EA-CHM'],
            ['province_code' => 'EA', 'name' => 'Chasefu', 'code' => 'EA-CSF'],
            ['province_code' => 'EA', 'name' => 'Chipangali', 'code' => 'EA-CPG'],
            ['province_code' => 'EA', 'name' => 'Chipata', 'code' => 'EA-CPT'],
            ['province_code' => 'EA', 'name' => 'Kasenengwa', 'code' => 'EA-KSN'],
            ['province_code' => 'EA', 'name' => 'Katete', 'code' => 'EA-KAT'],
            ['province_code' => 'EA', 'name' => 'Lumezi', 'code' => 'EA-LUM'],
            ['province_code' => 'EA', 'name' => 'Lundazi', 'code' => 'EA-LUN'],
            ['province_code' => 'EA', 'name' => 'Lusangazi', 'code' => 'EA-LSG'],
            ['province_code' => 'EA', 'name' => 'Mambwe', 'code' => 'EA-MAM'],
            ['province_code' => 'EA', 'name' => 'Nyimba', 'code' => 'EA-NYI'],
            ['province_code' => 'EA', 'name' => 'Petauke', 'code' => 'EA-PET'],
            ['province_code' => 'EA', 'name' => 'Sinda', 'code' => 'EA-SIN'],
            ['province_code' => 'EA', 'name' => 'Vubwi', 'code' => 'EA-VUB'],

            // Luapula Province
            ['province_code' => 'LP', 'name' => 'Chembe', 'code' => 'LP-CHE'],
            ['province_code' => 'LP', 'name' => 'Chienge', 'code' => 'LP-CHG'],
            ['province_code' => 'LP', 'name' => 'Chifunabuli', 'code' => 'LP-CFI'],
            ['province_code' => 'LP', 'name' => 'Chipili', 'code' => 'LP-CPL'],
            ['province_code' => 'LP', 'name' => 'Kawambwa', 'code' => 'LP-KAW'],
            ['province_code' => 'LP', 'name' => 'Lunga', 'code' => 'LP-LUN'],
            ['province_code' => 'LP', 'name' => 'Mansa', 'code' => 'LP-MAN'],
            ['province_code' => 'LP', 'name' => 'Milenge', 'code' => 'LP-MIL'],
            ['province_code' => 'LP', 'name' => 'Mwansabombwe', 'code' => 'LP-MSB'],
            ['province_code' => 'LP', 'name' => 'Mwense', 'code' => 'LP-MWE'],
            ['province_code' => 'LP', 'name' => 'Nchelenge', 'code' => 'LP-NCH'],
            ['province_code' => 'LP', 'name' => 'Samfya', 'code' => 'LP-SAM'],

            // Lusaka Province
            ['province_code' => 'LS', 'name' => 'Chilanga', 'code' => 'LS-CHL'],
            ['province_code' => 'LS', 'name' => 'Chongwe', 'code' => 'LS-CHO'],
            ['province_code' => 'LS', 'name' => 'Kafue', 'code' => 'LS-KAF'],
            ['province_code' => 'LS', 'name' => 'Luangwa', 'code' => 'LS-LUA'],
            ['province_code' => 'LS', 'name' => 'Lusaka', 'code' => 'LS-LSK'],
            ['province_code' => 'LS', 'name' => 'Rufunsa', 'code' => 'LS-RUF'],

            // Muchinga Province
            ['province_code' => 'MU', 'name' => 'Chinsali', 'code' => 'MU-CHN'],
            ['province_code' => 'MU', 'name' => 'Isoka', 'code' => 'MU-ISO'],
            ['province_code' => 'MU', 'name' => 'Kanchibiya', 'code' => 'MU-KAN'],
            ['province_code' => 'MU', 'name' => 'Lavushi Manda', 'code' => 'MU-LVM'],
            ['province_code' => 'MU', 'name' => 'Mafinga', 'code' => 'MU-MAF'],
            ['province_code' => 'MU', 'name' => 'Mpika', 'code' => 'MU-MPI'],
            ['province_code' => 'MU', 'name' => 'Nakonde', 'code' => 'MU-NAK'],
            ['province_code' => 'MU', 'name' => 'Shiwang\'andu', 'code' => 'MU-SHI'],

            // Northern Province
            ['province_code' => 'NO', 'name' => 'Chilubi', 'code' => 'NO-CHL'],
            ['province_code' => 'NO', 'name' => 'Kaputa', 'code' => 'NO-KAP'],
            ['province_code' => 'NO', 'name' => 'Kasama', 'code' => 'NO-KAS'],
            ['province_code' => 'NO', 'name' => 'Lunte', 'code' => 'NO-LUN'],
            ['province_code' => 'NO', 'name' => 'Lupososhi', 'code' => 'NO-LUP'],
            ['province_code' => 'NO', 'name' => 'Luwingu', 'code' => 'NO-LUW'],
            ['province_code' => 'NO', 'name' => 'Mbala', 'code' => 'NO-MBA'],
            ['province_code' => 'NO', 'name' => 'Mporokoso', 'code' => 'NO-MPO'],
            ['province_code' => 'NO', 'name' => 'Mpulungu', 'code' => 'NO-MPU'],
            ['province_code' => 'NO', 'name' => 'Mungwi', 'code' => 'NO-MUN'],
            ['province_code' => 'NO', 'name' => 'Nsama', 'code' => 'NO-NSA'],
            ['province_code' => 'NO', 'name' => 'Senga Hill', 'code' => 'NO-SEH'],

            // North-Western Province
            ['province_code' => 'NW', 'name' => 'Chavuma', 'code' => 'NW-CHV'],
            ['province_code' => 'NW', 'name' => 'Ikelenge', 'code' => 'NW-IKE'],
            ['province_code' => 'NW', 'name' => 'Kabompo', 'code' => 'NW-KAB'],
            ['province_code' => 'NW', 'name' => 'Kalumbila', 'code' => 'NW-KAL'],
            ['province_code' => 'NW', 'name' => 'Kasempa', 'code' => 'NW-KAS'],
            ['province_code' => 'NW', 'name' => 'Manyinga', 'code' => 'NW-MAN'],
            ['province_code' => 'NW', 'name' => 'Mufumbwe', 'code' => 'NW-MUF'],
            ['province_code' => 'NW', 'name' => 'Mushindano', 'code' => 'NW-MUS'],
            ['province_code' => 'NW', 'name' => 'Mwinilunga', 'code' => 'NW-MWI'],
            ['province_code' => 'NW', 'name' => 'Solwezi', 'code' => 'NW-SOL'],
            ['province_code' => 'NW', 'name' => 'Zambezi', 'code' => 'NW-ZAM'],

            // Southern Province
            ['province_code' => 'SO', 'name' => 'Chikankata', 'code' => 'SO-CHK'],
            ['province_code' => 'SO', 'name' => 'Chirundu', 'code' => 'SO-CHR'],
            ['province_code' => 'SO', 'name' => 'Choma', 'code' => 'SO-CHO'],
            ['province_code' => 'SO', 'name' => 'Gwembe', 'code' => 'SO-GWE'],
            ['province_code' => 'SO', 'name' => 'Itezhi-Tezhi', 'code' => 'SO-ITZ'],
            ['province_code' => 'SO', 'name' => 'Kalomo', 'code' => 'SO-KAL'],
            ['province_code' => 'SO', 'name' => 'Kazungula', 'code' => 'SO-KAZ'],
            ['province_code' => 'SO', 'name' => 'Livingstone', 'code' => 'SO-LIV'],
            ['province_code' => 'SO', 'name' => 'Mazabuka', 'code' => 'SO-MAZ'],
            ['province_code' => 'SO', 'name' => 'Monze', 'code' => 'SO-MON'],
            ['province_code' => 'SO', 'name' => 'Namwala', 'code' => 'SO-NAM'],
            ['province_code' => 'SO', 'name' => 'Pemba', 'code' => 'SO-PEM'],
            ['province_code' => 'SO', 'name' => 'Siavonga', 'code' => 'SO-SIA'],
            ['province_code' => 'SO', 'name' => 'Sinazongwe', 'code' => 'SO-SIN'],
            ['province_code' => 'SO', 'name' => 'Zimba', 'code' => 'SO-ZIM'],

            // Western Province
            ['province_code' => 'WE', 'name' => 'Kalabo', 'code' => 'WE-KLB'],
            ['province_code' => 'WE', 'name' => 'Kaoma', 'code' => 'WE-KAO'],
            ['province_code' => 'WE', 'name' => 'Limulunga', 'code' => 'WE-LIM'],
            ['province_code' => 'WE', 'name' => 'Luampa', 'code' => 'WE-LUA'],
            ['province_code' => 'WE', 'name' => 'Lukulu', 'code' => 'WE-LUK'],
            ['province_code' => 'WE', 'name' => 'Mitete', 'code' => 'WE-MIT'],
            ['province_code' => 'WE', 'name' => 'Mongu', 'code' => 'WE-MON'],
            ['province_code' => 'WE', 'name' => 'Mulobezi', 'code' => 'WE-MUL'],
            ['province_code' => 'WE', 'name' => 'Mwandi', 'code' => 'WE-MWA'],
            ['province_code' => 'WE', 'name' => 'Nalolo', 'code' => 'WE-NAL'],
            ['province_code' => 'WE', 'name' => 'Nkeyema', 'code' => 'WE-NKE'],
            ['province_code' => 'WE', 'name' => 'Senanga', 'code' => 'WE-SEN'],
            ['province_code' => 'WE', 'name' => 'Sesheke', 'code' => 'WE-SES'],
            ['province_code' => 'WE', 'name' => 'Shang\'ombo', 'code' => 'WE-SHA'],
            ['province_code' => 'WE', 'name' => 'Sikongo', 'code' => 'WE-SIK'],
            ['province_code' => 'WE', 'name' => 'Sioma', 'code' => 'WE-SIO'],
        ];

        foreach ($districts as $district) {
            DB::table('districts')->insert([
                'province_id' => $provinces[$district['province_code']]->id,
                'name' => $district['name'],
                'code' => $district['code'],
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('districts');
    }
};
