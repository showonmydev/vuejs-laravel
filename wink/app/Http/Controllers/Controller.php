<?php

namespace Wink\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

/**
* @SWG\Swagger(
*     basePath="/v1/",
*     host="winkhq.com",
*     schemes={"http"},
*     produces={"application/json"},
*     consumes={"application/json"},
*          @SWG\Info(
*              title="WinkHQ API",
*              version="1.0",
*              description="The API routes available for external use from WinkHQ",
*              @SWG\Contact(name="IBSA Developers",email="developers@incendiaryblue.com"), 
*          ),
*          @SWG\Definition(
*              definition="Timestamps",
*              @SWG\Property(
*                  property="created_at",
*                  type="string",
*                  format="date-time",
*                  description="Creation date",
*                  example="2017-03-01 00:00:00"
*              ),
*              @SWG\Property(
*                  property="updated_at",
*                  type="string",
*                  format="date-time",
*                  description="Last updated",
*                  example="2017-03-01 00:00:00"
*              )
*          )
* )
*/

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
