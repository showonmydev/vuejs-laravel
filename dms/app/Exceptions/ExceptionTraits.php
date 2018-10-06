<?php

//namespace App\Exceptions;

// use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
// use Illuminate\Database\Eloquent\ModelNotFoundException;
// use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
// use Symfony\Component\HttpFoundation\Response;

//use ResponseJson;

trait ExceptionsTraits {

    /*public function APIException($request, $e) {
        if ($e instanceof MethodNotAllowedHttpException){
            return response()->json([
                'errors' => 'Product Model not found'
            ],Response::HTTP_NOT_FOUND);
            //return $this->JSONSend->Send(['error'=>'Method not allowed'], 405);
        }

        if ($e instanceof NotFoundHttpException){
            return response()->json([
                'errors' => 'Product Model not found'
            ],Response::HTTP_NOT_FOUND);
            //return $this->JSONSend->Send(['error'=>'Method not allowed'], 405);
        }
    }*/

}
?>