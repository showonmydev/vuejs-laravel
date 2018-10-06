<?php

namespace Wink\Http\Controllers;

use Auth;
use File;
use Storage;
use Response;
use Wink\Task;
use Wink\Image;
use Wink\Question;
use Illuminate\Http\Request;
use Wink\Http\Requests;
use Wink\Http\Controllers\Controller;

class ImagesController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', ['only' => ['save']]);
    }

    // Serve the image back from the server
    public function serve($filename)
    {
        $path = storage_path() . '/app/images/' . $filename;

        $file = File::get($path);
        $type = File::mimeType($path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    }
    
    // Save the image coming in from the API to the server
    public function save(Request $request)
    {
        \Log::info('I1');
        \Log::info(Auth::user());
        \Log::info($request->all());

        $task = Task::find($request->input('taskId'));


        if($request->hasFile('file')){

            $file = $request->file('file');

        } elseif($request->has('file')){

            $data = $request->input('file');
            $file = base64_decode($data);

        }

        // abort_unless authed user id is not id on task checked_out_id

        if(Auth::user()->id !== $task->checked_out_id){
            return response()->json([
                'message' => 'You have not checked out this task, or the time has expired. Please checkout this task before completing the questions.'
                ], 500);
        }

        // file name should be campaign id, question id, task id then datestamp
        $file_name = uniqid().'.jpg';

        if($request->hasFile('file')){
            Storage::put(
            'images/'.$file_name,
            file_get_contents($file->getRealPath())
            );
        }else{
            Storage::put(
            'images/'.$file_name,
             $file
            );
        }

        $savedFile = Image::create([
            'company_id' => $task->company_id,
            'campaign_id'=>$task->campaign_id,
            'location_id'=>$task->location_id,
            'question_id' => $request->input('questionId'),
            'user_id' => Auth::user()->id,
            'task_id' => $task->id,
            'name'      => $file_name
            ]);

        // return response($savedFile->id, 200);
        return response()->json([
            'file_id' => $savedFile->id,
            'question_id' => $request->input('questionId')
            ], 200);
    }
}
