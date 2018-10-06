<?php

namespace App\Model;

use DB;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'softwares';

    public function getLatestApp()
    {
        $sql = "SELECT dms1.* FROM dms_softwares dms1
         INNER JOIN( SELECT max(version) max_version, app_name FROM dms_softwares GROUP BY app_name ) dms2
         ON dms1.app_name = dms2.app_name
         AND dms1.version = dms2.max_version
         ORDER BY dms1.version DESC";

        $results = DB::select($sql);
        return $results;
    }

    public function getOlderApp()
    {
        $results = Application::groupBy('app_name', 'version')
            ->orderBy('app_name', 'asc')
            ->orderBy('version', 'desc')
            ->get();
        return $results;
    }
}
