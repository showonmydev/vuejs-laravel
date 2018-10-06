<?php

function flash($title = null, $message = null)
{
    $flash = app('Wink\Http\Flash');

    if(func_num_args() == 0) {
        return $flash;
    }

    return $flash->info($title, $message);
}