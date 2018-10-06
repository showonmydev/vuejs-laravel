<?php

namespace Wink\Http;

class Flash {

    public function create($title, $message, $type, $key = "flash_message")
    {
        return session()->flash($key, [
            "title" => $title,
            "message" => $message,
            "type" => $type
        ]);
    }

    /**
     * Create an info flash message
     * @param $title
     * @param $message
     * @return mixed
     */
    public function info($title, $message)
    {
        return $this->create($title, $message, 'info');
    }

    /**
     * Create a success flash message
     * @param $title
     * @param $message
     * @return mixed
     */
    public function success($title, $message)
    {
        return $this->create($title, $message, 'success');
    }

    /**
     * Create an error flash message
     * @param $title
     * @param $message
     * @return mixed
     */
    public function error($title, $message)
    {
        return $this->create($title, $message, 'error');
    }

    /**
     * Create a warning flash message
     * @param $title
     * @param $message
     * @return mixed
     */
    public function warning($title, $message)
    {
        return $this->create($title, $message, 'warning');
    }

    /**
     * Create an overlay flash message
     * @param $title
     * @param $message
     * @param string $level
     * @return mixed
     */
    public function overlay($title, $message, $level = "success")
    {
        return $this->create($title, $message, $level, 'flash_message_overlay');
    }

}