//require necessary libraries
const express = require("express")
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')


app.use(bodyParser.json());





// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//set view directory and engine
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')


app.get('/autocomplete', (req, res) => {
	res.render ('autocomplete')
});




//route one render every user
app.get('/', (request, response) =>{
	//read users from json file
	fs.readFile(__dirname + '/user.json', (err, data) =>{
		if (err){ 
			throw err
		}
		//parse data from json
		let allUsers = JSON.parse(data)
		//render index.pug and send along all users
		response.render('index', {allUsers: allUsers})
	})


})

		//route two renders search from

app.get('/search', (request, response) => {
	response.render('search')
})

app.get('/watjijwil', (request, response) => {
	response.send('Nee wat jij wil')

} )

app.get('/addUser', (request, response) => {
	response.render('addUser')

})

app.get('/oops', (req, res) => {
	res.render ('oops')
})

app.post('/searchData', (req, res) =>{
	console.log(req.body)

	let result = []
	fs.readFile(__dirname + '/user.json', (err, data) =>{
		if(err){ 
			throw err
		}
		let parsedData = JSON.parse(data)
		for (let i = parsedData.length - 1; i >= 0; i--) {
			if (parsedData[i].firstName.indexOf(req.body.input) > -1){
				result.push(parsedData[i].firstName)
			}
		}		
	res.send(result)
	})
})



		//route three renders results from search
app.post('/search', (request, response) => {
	let searchedName = request.body.searchedName
	fs.readFile(__dirname + '/user.json', 'utf-8', (err, data) =>{
		if (err){ 
			throw err
		}
		//parse data from json
		const allUsers = JSON.parse(data)
		for (var i = allUsers.length - 1; i >= 0; i--) {
			if (allUsers[i].firstname === searchedName || searchedName === allUsers[i].lastname) {
				response.render('searchResult', {foundUser: allUsers[i]})
			}	
			else { 
				console.log('bijna')
			}

		}
	})
})
//create route for http get request




app.post('/addUser', (request, response) => {
	// let usersAdded = JSON.stringify({firstname: request.body.firstname, lastname: request.body.lastname, email: request.body.email})
	// console.log(usersAdded)
	//je wilt dat userAdded een object is, met json.stringify is het een string
	var userAdded = {
		firstname: request.body.firstname,
		lastname: request.body.lastname,
		email: request.body.email,
	}
	console.log('user added')
	console.log(userAdded)

	//stap 1 adds new data to existing json file
	fs.readFile(__dirname + '/user.json','utf-8', (error, data) =>{
		if (error) {
			throw error
		}
		
		var users = JSON.parse(data)

		// for (var i = 0; i < users.length; i++) { 
		// 	if (userAdded.firstname === users[i].firstName || 
		// 		userAdded.lastname === users[i].lastName || 
		// 		userAdded.email === users[i].email) {
		// 			response.render('oops')
		// 			break
		// 	} //closes if
		// 	else { 
				// var userAdded = JSON.parse(data)
				// userAdded.push(userAdded)
				users.push(userAdded)
				users = JSON.stringify(users)
					
				console.log('added')

		// 	}
		// }

		//data.push(newUser) //returns number of elements in the new array
		//var usersAdded = data //must store the new json file in a var
		//console.log(newuserlist)



	// var stringifiedlist = JSON.stringify(newuserlist) 

		// callback(parser)


		//data is een string op dit moment
		//JSON.parse gebruiken op data en dat stoppen in een variabele, nu snapt javascript wat het is
		//userAdded toevoegen (dat een object is)
		//de parse.json variabele moet je stoppen in de fs.writeFile waar userAdded stsat
			//dit moet je wel weer omzetten naar een string met JSON.stringify
		fs.writeFile(__dirname + '/user.json', users, (error) => {
			if (error) {
				throw error

			}
			
			console.log('file saved')
			users = JSON.parse(users)
			response.render('index', {allUsers : users});
	



		
		}) //end fs.writeFile
	 });//end fs.readFile

// response.redirect('/')
	
//  end app.post

});


//server listening on port 3000

app.listen(3000, () => {
	console.log("watjijwil")
})




