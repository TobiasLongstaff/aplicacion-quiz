const mongoose = require('mongoose')
const connectionString = 'mongodb+srv://TobiasLongstaff:qCen1wBQk3KMNhKZ@aplicacion-quiz.vyp00.mongodb.net/app-quiz?retryWrites=true&w=majority'

mongoose.connect(connectionString, 
{
    // useCreateIndex: true, 
    // useFindAndModify: false, 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() =>
{
    console.log('Conexion correcta')
}).catch(error =>
{
    console.error(error)
})