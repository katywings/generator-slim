<?php

namespace app\helpers;

class AuthHash {
	public static function create(){
		$secret_hash = "MNhM3E3AEt85VkDVaVvLV1kcKV2z1FQ29vj87gzs";
		$day = date("l");
		$date = date("dmY");
		$hash = sha1($secret_hash.$day.$date);
		return $hash;
	}
	public static function auth($hash){
		if($hash == self::create()){
			return true;
		} else {
			return false;
		}
	}
}