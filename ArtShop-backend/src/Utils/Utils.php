<?php

namespace App\Util;

class Utils
{
    public static function isUUID($uuid)
    {
        $pattern = '/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i';

        return preg_match($pattern, $uuid) === 1;
    }
}
