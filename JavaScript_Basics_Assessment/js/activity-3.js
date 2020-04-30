var arr = ["Danny", "Sydney", "Charles"];

for(i = 0; i < 3; i++){
    var name = prompt('Enter a name:');
    arr.push(name);
}

for(i = 0; i < arr.length; i++){
    console.log(arr[i]);
}