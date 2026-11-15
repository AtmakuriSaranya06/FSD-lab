const students = [
    {id : 1, name: "John DOe", age:19},
    {id : 2, name: "Jane", age:20},
    {id : 3, name: "Alice", age:21},

];
const newStudent = {id:4, name:"Bob", age:19};
students.push(newStudent);
console.log("List of Students:",students);
const studentReadId = 2;
const student = students.find((stu) => stu.id ===studentReadId);
if(student)
{
    console.log(`Student with id ${studentReadId}: `,student);
}
else
{
    console.log("Student with id ${studentReadId} not found");
}
const updateId = 3;
const updateData = {id : 3, name : "AliceJohn", age: 22 };
const updateIndex = students.findIndex((stu) => stu.id === updateId);
if(updateIndex !== -1)
{
    students[updateIndex] = {...students[updateIndex], ...updateData};
    console.log("Student updated: ",updateData);
}
else
{
    console.log("Students with id ${updateId} not found");
}
const deleteId = 1;
const deleteIndex = students.findIndex((stu) => stu.id === deleteId);
if(deleteIndex !== -1)
{
    const deletedStudent = students.splice(deleteIndex,1);
    console.log("Student deleted: ",deletedStudent[0]);
}
else
{
    console.log("Student with id ${deleteId} not found");
}
console.log("Final list of students: ",students);