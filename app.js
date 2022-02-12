const profileDataArgs = process.argv.slice(2, process.argv.length);
console.log(profileDataArgs);
const message = 'Hello Node!';


const animalArray = ['dog', 'cat', 'pig'];
animalArray.push('cow');

const personObj = {
    name: 'Mike',
    age: 31
};

personObj.age = 100;
personObj.occupation = 'Developer';

const printProfileData = profileDataArr => {
    //this
    for (let i = 0; i < profileDataArr.length; i += 1){
    console.log(profileDataArr[i]);
    }

    console.log('================');
    //is the same as this
    profileDataArr.forEach(profileItem => console.log(profileItem));
};

printProfileData(profileDataArgs);