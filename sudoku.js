var sudoku = (function(){
	
	var sudo = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0]
	];

	//填充数独
	var fill = function(){
		var count = 0;
		for(var i = 0; i < 9; ){
			for(var j = 0; j < 9; ){ 
				count++;
				var num = numFill(i, j);
				if(!num){
					sudo[i][j] = 0;
					if(j == 0){
						if(i == 0){
							console.log('无解');
							return false;
						}
						j = 8;
						i--;
					}else{
						j--;
					}
				}else{
					sudo[i][j] = num;
					j++;
				}
			}
			i++;
		}
		console.log('count='+count);
		return sudo;
	}

	//返回该位置可填的下一个数字
	var numFill = function(x, y){
		var arrNo = numValidNo(x, y) || [];
		for(var i = sudo[x][y] + 1; i <= 9; i++){
			if(arrNo.indexOf(i) < 0){
				return i;
			}
		}
		return false;
	};

	//返回一个数组，包含该位置所有已使用数字
	var numValidNo = function(x, y){
		var arrNo = [];
		for(var i = 0; i < 9; i++){
			//获取元素所在行已填数字
			if(arrNo.indexOf(sudo[x][i]) < 0 && i !== y){
				arrNo.push(sudo[x][i]);
			}
			//获取元素所在列已填数字
			if(arrNo.indexOf(sudo[i][y]) < 0 && i !==x){
				arrNo.push(sudo[i][y]);
			}
		}
		//获取元素所在块已填数字
		for(var i = parseInt(x/3) * 3; i < parseInt(x/3) * 3 + 3; i++){
			for(var j = parseInt(y/3) * 3; j < parseInt(y/3) * 3 + 3; j++){
				if(arrNo.indexOf(sudo[i][j]) < 0 && i !== x && j !== y){
					arrNo.push(sudo[i][j]);
				}
			}
		}
		return arrNo;
	};

	return {
		fill : fill,
		numFill : numFill
	};
})();