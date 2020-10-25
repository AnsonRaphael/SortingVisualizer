export function getbubbleSortAnimations(array){
    var animation=[];
    var isAnimation=false;
    for(var i=0;i<array.length;i++){
        for(var j=0;j<array.length-1-i;j++){                
            if(array[j]<array[j+1]){
                isAnimation=true;
                var temp=array[j];
                array[j]=array[j+1];
                array[j+1]=temp;
                animation.push({
                    comparisonSwap:[j,j+1]
                });
                                            
            }else{
                animation.push({
                    comparison:[j,j+1]
                });
            }
            animation.push({
                comparisonDone:[j,j+1]
            });
        }
        animation.push({
            done:[array.length-1-i],
        });
       
    }

    return {isAnimation:isAnimation,animation:animation};
}

