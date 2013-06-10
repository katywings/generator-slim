<?php

namespace app\helpers;

class Search {
	private $keyword=false;
	private $keyword_origin=false;
	private $results=false;
	private $results_count=false;
	private $search_dir=false;

	function __construct($search_dir=false,$keyword=false){
		$this->setSearchDir($search_dir);
		$this->setKeyword($keyword);
	}

	public function __get($property) {
        return (isset($this->{$property}) ? $this->{$property} : null);
    }

    public function setKeyword($keyword=false){
    	if($keyword){
    		$this->keyword_origin = $keyword;
    		$this->keyword = preg_quote(trim($keyword));
    	}
    }

    public function setSearchDir($search_dir=false){
    	if($search_dir){
    		$this->search_dir = $search_dir;
    	}
    }

	public function start(){ 
		$this->results_count = 0;
		$this->results = array();
		set_time_limit("600");
		$handle=opendir($this->search_dir); 
		while(false!==($file=readdir($handle))){ 
			if($file!="."&&$file!=".."){ 
				if(!is_dir("$this->search_dir/$file")){ 
					$data=file_get_contents($this->search_dir.'/'.$file);
					preg_match("@{% block content %}(.*?){% endblock content %}@siu",$data,$b);
					if(!empty($b)){
						$body=strip_tags($b[1]); 
						$body=preg_replace("'{%[^>]+%}'i", "", $body);
						$body=preg_replace("'{{[^>]+}}'i", "", $body);
						if($file!="search.twig"){ 
							if(preg_match("@$this->keyword@iu",$body)){ 
								if(preg_match("'{# title (.+) #}'",$data,$m)){ 
									$title=$m["1"]; 
								} else { 
									$title=""; 
								} 
								$regex = "/".'(\S+\s+){0,50}\S*'.$this->keyword.'\S*(\s+\S+){0,50}'."/iu";
								preg_match_all($regex,$body, $result);
								$found_in = preg_replace("/\S*".$this->keyword."\S*/iu", "<b>\$0</b>", $result[0],-1,$subcount);
								$this->results_count += $subcount;
								if(!empty($found_in)){ 
									$this->results[]=array('filename'=>$this->search_dir.'/'.$file,'title'=>$title, 'foundIn'=>$found_in); 
								}
							} 
						} 
					}
				} 
			} 
		} 
		return true;
	} 
}
