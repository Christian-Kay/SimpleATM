
const prompt = require('prompt-sync')();
const fs = require('fs');
const { isNaN, } = require('mathjs');
const math = require('mathjs')
const usersData = JSON.parse(fs.readFileSync('dataFile.json'))

var newUser = {
    "firstName": '',
    "lastName": '',
    "username": '',
    "password": '',
    "email": '',
    "phoneNumber": '',
    "accountNumber": '',
    "accountBal": 0,
    "transactions": [],
    isLoggedIn: false
}

start()
function start() {
    console.log('------- WELCOME TO ATM APP -----------')
    var x = prompt("Please enter 1 to login, dont have an account? Enter 2 to sign-up: ")
    switch (x) {
        case '1': {
            console.clear()
            login()
            break
        }
        case '2': {
            console.clear()
            signUp()
            break
        }
        default:
            console.log('Please enter a valid input')
            start();
    }
}

function signUp() {
    console.log('--------- SIGN-UP --------------')
    register()
    function register() {
        console.log('Please fill in the following details: ')
        while (true) {
            let firstName = prompt('First Name: ').toUpperCase();
            if (firstName == '') {
                console.log('Field cannot be empty please enter your first name')
            } else if (Number(firstName)) {
                console.log('Your name cannot be a number, please enter a valid first name')
            } else {
                newUser.firstName = firstName;
                false;
                break
            }
        }
        while (true) {
            let lastName = prompt('Last Name: ').toUpperCase();
            if (lastName == '') {
                console.log('Field cannot be empty please enter your last name')
            } else if (Number(lastName)) {
                console.log('Your name cannot be a number, please enter a valid last name');
            } else {
                newUser.lastName = lastName;
                false;
                break
            }
        }
        while (true) {
            let username = prompt('Please select a UserName: ').toUpperCase();
            if (username == '') {
                console.log('Field cannot be empty please enter a valid username')
            } else if (Number(username)) {
                console.log('Your Username cannot be a number, please enter a valid username')
            } else {
                newUser.username = username;
                false;
                break
            }
        }

        pass()
        function pass() {
            let retry = true
            while (retry) {
                let password = prompt('create a password: ')
                if (password.length < 4) {
                    console.log(`Password is too short,  try something longer`)
                    retry = true;
                } else {
                    let confirmPassword = prompt('Please confirm your password: ')
                    if (password == confirmPassword) {
                        newUser.password = password;
                        break
                    } else {
                        console.log('Password does not match, please try again')
                        retry = true

                    }
                }
            }
        }
        checkEmail()
        function checkEmail() {
            let email = prompt('Enter your Email address: ').toUpperCase();
            let character1 = '@'
            let character2 = '.COM'
            if (email.includes(character1) && email.includes(character2)) {
                newUser.email = email;
            } else if (email == '') {
                console.log('Field cannot be blank, please enter a valid email address');
                checkEmail();
            } else {
                console.log('Invalid Email address, please enter a valid email address');
                checkEmail();
            }
        }
        checkPhoneNumber()
        function checkPhoneNumber() {
            let number = prompt('Enter your Phone Number: ');
            if (number.length == 11 && number.includes('0', 0) && number.includes('0', 2)) {
                newUser.phoneNumber = number;
            } else {
                console.log('Please enter a valid Phone Number');
                checkPhoneNumber();
            }
        }
        let accNo = math.floor(math.random() * math.pow(10, 10))
        newUser.accountNumber = accNo;
        console.clear()
        console.log(`Name: ${newUser.firstName} ${newUser.lastName}\nUsername: ${newUser.username}\nEmail: ${newUser.email}\nPhone Number: ${newUser.phoneNumber}`);
        final(newUser);
        function final(newUser) {
            confirm = prompt('please confirm your information. press 1 to finalize or 2 to restart registeration: ')
            if (confirm == 1) {
                usersData.push(newUser)
                fs.writeFileSync('dataFile.json', JSON.stringify(usersData))
                console.clear()
                console.log(`Congratulations You have succefully registered\nYour Account Number is ${newUser.accountNumber}`)
                while (true) {
                    let proceed = prompt("Press Enter to Contine...")
                    if (proceed !== '') {
                        console.clear()
                        console.log('Please press enter to continue..')
                        false
                    } else {
                        console.clear()
                        login()
                        break
                    }
                }
            } else if (confirm == 2) {
                console.clear()
                signUp()
            } else {
                confirm.log('Please Enter a valid input: ')
                final()
            }
        }

    }


}

function
    login() {
    console.log('-------- LOGIN -------------')
    console.log('Please Enter Your Details')
    let username = prompt('Username: ').toUpperCase()
    let password = prompt('Password: ');
    const user = usersData.find(user => user.username === username && user.password === password);
    if (user) {
        user.isLoggedIn = true;
        console.clear()
        console.log(`WELCOME ${username}`)
        menu()
    } else {
        console.log('Invalid Username or Password')
        login()
    }

}

function menu() {
    console.log('---------- ATM APP MENU ------------')
    console.log('You can choose...')
    console.log('1. Cash Deposit')
    console.log('2. Withdrawal')
    console.log('3. Check Your Balance')
    console.log('4. Transfers')
    console.log('5. Mobile Topup')
    console.log('6. Check Transaction History')
    console.log('7. Log Out')
    input = parseInt(prompt('what operation would you like to perform? : '));
    if (input == 1) {
        console.clear()
        deposit();
    } else if (input == 2) {
        console.clear()
        withdraw()
    } else if (input == 3) {
        console.clear()
        checkBal();
    } else if (input == 4) {
        console.clear()
        transfer()
    } else if (input == 5) {
        console.clear()
        topUp()
    } else if (input == 6) {
        console.clear()
        accStatement()
    } else if (input == 7) {
        console.clear()
        return logOut();
    } else {
        console.clear()
        console.log('Please enter a valid input')
        menu();
    }
}

function logOut() {
    const user = usersData.find(user => user.isLoggedIn);
    if (user) {
        usersData.push(user.isLoggedIn = false)
        fs.writeFileSync('dataFile.json', JSON.stringify(usersData))
        console.log(`Goodbye, ${user.username}!`);
        //login()
    }
}

function deposit() {
    console.log('---------- DEPOSIT -----------')
    const user = usersData.find(user => user.isLoggedIn)
    if (user) {
        amt = parseInt(prompt('How much Would You Like To Deposit: #'))
        checkAmt(amt)
        function checkAmt(amt) {
            if (isNaN(amt) == true) {
                console.log(`Invalid amount`);
                cont()
            } else if (amt <= 0) {
                console.log(`Invalid amount`);
                cont()
            } else {
                usersData.push(user.accountBal += amt)
                usersData.push(user.transactions.push({ Type: 'DEPOSIT', Amount: `+ #${amt}` }))
                fs.writeFileSync('dataFile.json', JSON.stringify(usersData))
                console.log(`You have successfully made a deposit of #${amt}`)
                cont()
            }
        }
    }
    function cont() {
        var num = prompt('Press 1 to make another deposit or 2 to return back to Main Menu: ')
        if (num == 1) {
            console.clear()
            deposit()
        } else if (num == 2) {
            console.clear()
            menu()
        } else {
            console.log('Please Enter a valid Input')
            cont()
        }
    }

}

function checkBal() {
    console.log('---------- ACCOUNT -----------')
    const user = usersData.find(user => user.isLoggedIn)
    if (user) {
        console.log(`Hello, ${user.lastName} ${user.firstName}`)
        console.log(`Account: ${user.accountNumber}`)
        console.log(`Your Available Balance is #${user.accountBal}`);
    }
    cont()
    function cont() {
        var num = prompt('Press enter to return to main menu : ')
        if (num == '') {
            console.clear()
            menu()
        } else {
            console.log('Please Enter a valid Input')
            cont()
        }
    }

}

function withdraw() {
    console.log('---------- WITHDRAWAL -----------')
    const user = usersData.find(user => user.isLoggedIn)
    if (user) {
        amt = parseInt(prompt('How much Would You Like To Withdraw: #'));
        checkBal(amt)
        function checkBal(amt) {
            if (isNaN(amt) == true) {
                console.log(`Invalid amount`);
            } else if (user.accountBal < amt) {
                console.log(`Insufficient Funds`);
                cont()
            } else if (amt <= 0) {
                console.log('Invalid Amount')
                cont()
            } else {
                let retry = true
                let attempts = 0;
                while (retry) {
                    var pin = prompt(`You are about to make a withdrawal of ${amt}, please enter your pin to continue: `)
                    const checkPin = user.password == pin
                    if (checkPin && retry) {
                        usersData.push(user.accountBal -= amt)
                        usersData.push(user.transactions.push({ Type: 'WITHDRAWAL', Amount: `- #${amt}` }))
                        fs.writeFileSync('dataFile.json', JSON.stringify(usersData))
                        console.log(`You have successfully withdrawn #${amt}`)
                        cont()
                        break
                    } else {
                        attempts++
                        if (attempts <= 2) {
                            console.log(`Incorrect Password, You will automatically be logged-out after 3 failed attempts\nYou have ${3 - attempts} trials left`);
                            retry = true;
                        } else {
                            console.log(`Maxium number of attempts reached!`)
                            logOut()
                            break
                        }
                    }
                }
            }
        }
    }
    function cont() {
        var num = prompt('Press 1 to make another withdrawal or 2 to return back to Main Menu: ')
        if (num == 1) {
            console.clear()
            withdraw()
        } else if (num == 2) {
            console.clear()
            menu()
        } else {
            console.log('Please Enter a valid Input')
            cont()
        }
    }
}


function transfer() {
    console.log('---------- TRANSER -----------')
    const user = usersData.find(user => user.isLoggedIn)
    if (user) {
        amt = parseFloat(prompt('How much Would You Like To Transfer: #'));
        checkBal(amt)
        function checkBal(amt) {
            if (isNaN(amt)) {
                console.log('Invalid Amount');
                cont()
            } else if (user.accountBal < amt) {
                console.log(`Insufficient Funds`);
                cont()
            } else {
                let input = prompt('Recipents Account Number: ')
                const checkInput = usersData.find(checkInput => checkInput.accountNumber == input && !checkInput.isLoggedIn)
                if (checkInput) {
                    console.log(`User ${checkInput.firstName} ${checkInput.lastName} found`)
                    checkTransferDetails()
                    function checkTransferDetails() {
                        console.log('---------CONFIRM TRANSFER---------')
                        console.log(`Transaction Type: Inter-User`)
                        console.log(`Source Account: ${user.accountNumber}`)
                        console.log(`Recipient's Account number: ${checkInput.accountNumber}`)
                        console.log(`Recipent's Name: ${checkInput.firstName} ${checkInput.lastName} `)
                        console.log(`Transaction Amount: #${amt}`)
                        let finalize = prompt('Press 1 to confirm or 2 to Cancel: ')
                        if (finalize == 1) {
                            let retry = true;
                            let failure = 0;
                            while (retry) {
                                var pin = prompt(`please enter your password to complete transaction: `)
                                if (user.password == pin) {
                                    usersData.push(user.accountBal -= amt)
                                    usersData.push(checkInput.accountBal += amt)
                                    usersData.push(user.transactions.push({ Type: 'TRANSFER', Amount: `- #${amt} to ${checkInput.username}` }))
                                    usersData.push(checkInput.transactions.push({ Type: 'MONEY RECIEVED', Amount: `+ #${amt} from ${user.username}` }))
                                    fs.writeFileSync('dataFile.json', JSON.stringify(usersData))
                                    console.log(`You Have successfully transfered #${amt} to ${checkInput.firstName} ${checkInput.lastName} `)
                                    cont()
                                    break
                                } else {
                                    failure++;
                                    if (failure <= 2) {
                                        console.log(`Incorrect Password, You will be automically logged out after 3 failed attempts\nYou have ${3 - failure} attempts left`)
                                        retry = true;
                                    } else {
                                        console.log(`Maximum Number of attepmts reached`)
                                        logOut()
                                        break;
                                    }

                                }
                            }

                        } else if (finalize == 2) {
                            cont()
                        } else {
                            console.log('Please Enter a valid input')
                            false
                        }

                    }
                } else {
                    console.log('No User found')
                    cont()
                }
            }
        }
    }
    function cont() {
        var num = prompt('Press 1 to make another transfer or 2 to return back to Main Menu: ')
        if (num == 1) {
            console.clear()
            transfer()
        } else if (num == 2) {
            console.clear()
            menu()
        } else {
            console.log('Please Enter a valid Input')
            cont()
        }
    }

}
function accStatement() {
    console.log('-------------- Transaction History ------------')
    const user = usersData.find(user => user.isLoggedIn)
    if (user) {
        if (user.transactions.length === 0) {
            console.log('You Have not made any transactions on your account')
            let restart = true;
            while (restart) {
                cont = prompt('Press Enter to Contine: ')
                if (cont === '') {
                    restart = false;
                    console.clear()
                    menu()
                } else {
                    restart = true;
                }

            }
        } else {
            console.log(user.transactions)
            let restart = true;
            while (restart) {
                cont = prompt('Press Enter to Contine: ')
                if (cont === '') {
                    restart = false;
                    console.clear()
                    menu()
                } else {
                    restart = true;
                }

            }
        }
    }
}

function topUp() {
    console.log('----------MOBILE TOPUP -----------');
    const user = usersData.find(user => user.isLoggedIn)
    if (user) {
        var input = prompt('Input 1 for Airtime topup Or 2 for Data topup: ')
        select(input)
        function select(input) {
            if (input == 1) {
                //AIRTIME TOPUP
                console.clear()
                console.log('----------- AIRTIME TOPUP ---------------');
                console.log('1. for MTN')
                console.log('2. for AIRTEL')
                console.log('3. for GLO')
                console.log('4. for 9MOBILE')
                var network = prompt('Please select your network provider: ')
                netProvider(network)
                function cont() {
                    var num = prompt('Press 1 to make another topup or 2 to return back to Main Menu: ')
                    if (num == 1) {
                        console.clear()
                        topUp()
                    } else if (num == 2) {
                        console.clear()
                        menu()
                    } else {
                        console.log('Please Enter a valid Input')
                        cont()
                    }
                }
                function netProvider(network) {
                    if (network = 1) {
                        console.clear()
                        console.log('----------- MTN ----------')
                        checkPhoneNumber()
                        function checkPhoneNumber() {
                            var mobileNumber = prompt('Enter Mobile Number: ')
                            if (mobileNumber.length == 11 && mobileNumber.includes('0', 0) && mobileNumber.includes('0', 2)) {
                                var amt = prompt('Input Recharge Amount: #')
                                checkBal(amt, mobileNumber)
                            } else {
                                console.log('Please enter a valid Phone Number');
                                checkPhoneNumber();
                            }

                        }
                        function checkBal(amt, mobileNumber) {
                            if (user.accountBal < amt) {
                                console.log(`Insufficient Funds`);
                                cont()
                            } else {
                                usersData.push(user.accountBal -= amt)
                                usersData.push(user.transactions.push({ Type: 'AIRTIME TOPUP', Amount: `- #${amt} to ${mobileNumber}` }))
                                fs.writeFileSync('dataFile.json', JSON.stringify(usersData))
                                console.log(`Recharge amount of #${amt} to ${mobileNumber} Successful `)
                                cont()
                            }
                        }
                    } else if (network = 2) {
                        console.clear()
                        console.log('----------- AIRTEL ----------')
                        checkPhoneNumber()
                        function checkPhoneNumber() {
                            var mobileNumber = prompt('Enter Mobile Number: ')
                            if (mobileNumber.length == 11 && mobileNumber.includes('0', 0) && mobileNumber.includes('0', 2)) {
                                var amt = prompt('Input Recharge Amount: #')
                                checkBal(amt, mobileNumber)
                            } else {
                                console.log('Please enter a valid Phone Number');
                                checkPhoneNumber();
                            }

                        }
                        function checkBal(amt, mobileNumber) {
                            if (user.accountBal < amt) {
                                console.log(`Insufficient Funds`);
                                cont()
                            } else {
                                usersData.push(user.accountBal -= amt)
                                usersData.push(user.transactions.push({ Type: 'AIRTIME TOPUP', Amount: `- #${amt} to ${mobileNumber}` }))
                                fs.writeFileSync('dataFile.json', JSON.stringify(usersData))
                                console.log(`Recharge amount of #${amt} to ${mobileNumber} Successful `)
                                cont()
                            }
                        }
                    } else if (network == 3) {
                        console.clear()
                        console.log('----------- GLO ----------')
                        checkPhoneNumber()
                        function checkPhoneNumber() {
                            var mobileNumber = prompt('Enter Mobile Number: ')
                            if (mobileNumber.length == 11 && mobileNumber.includes('0', 0) && mobileNumber.includes('0', 2)) {
                                var amt = prompt('Input Recharge Amount: #')
                                checkBal(amt, mobileNumber)
                            } else {
                                console.log('Please enter a valid Phone Number');
                                checkPhoneNumber();
                            }

                        }
                        function checkBal(amt, mobileNumber) {
                            if (user.accountBal < amt) {
                                console.log(`Insufficient Funds`);
                                cont()
                            } else {
                                usersData.push(user.accountBal -= amt)
                                usersData.push(user.transactions.push({ Type: 'AIRTIME TOPUP', Amount: `- #${amt} to ${mobileNumber}` }))
                                fs.writeFileSync('dataFile.json', JSON.stringify(usersData))
                                console.log(`Recharge amount of #${amt} to ${mobileNumber} Successful `)
                                cont()
                            }
                        }
                    } else if (network = 4) {
                        console.clear()
                        console.log('----------- 9MOBILE ----------')
                        checkPhoneNumber()
                        function checkPhoneNumber() {
                            var mobileNumber = prompt('Enter Mobile Number: ')
                            if (mobileNumber.length == 11 && mobileNumber.includes('0', 0) && mobileNumber.includes('0', 2)) {
                                var amt = prompt('Input Recharge Amount: #')
                                checkBal(amt, mobileNumber)
                            } else {
                                console.log('Please enter a valid Phone Number');
                                checkPhoneNumber();
                            }

                        }
                        function checkBal(amt, mobileNumber) {
                            if (user.accountBal < amt) {
                                console.log(`Insufficient Funds`);
                                cont()
                            } else {
                                usersData.push(user.accountBal -= amt)
                                usersData.push(user.transactions.push({ Type: 'AIRTIME TOPUP', Amount: `- #${amt} to ${mobileNumber}` }))
                                fs.writeFileSync('dataFile.json', JSON.stringify(usersData))
                                console.log(`Recharge amount of #${amt} to ${mobileNumber} Successful `)
                                cont()
                            }
                        }
                    } else {
                        console.clear()
                        console.log('Please Enter a valid input')
                        netProvider()
                    }

                }
            } else if (input == 2) {
                //DATA BUNDLE
                console.clear()
                console.log('----------- DATA TOPUP ---------------');
                console.log('1. for MTN')
                console.log('2. for AIRTEL')
                console.log('3. for GLO')
                console.log('4. for 9MOBILE')
                var network = prompt('Please select your network provider: ')
                netProvider(network)
                function cont() {
                    var num = prompt('Press 1 to make another topup or 2 to return back to Main Menu: ')
                    if (num == 1) {
                        console.clear()
                        topUp()
                    } else if (num == 2) {
                        console.clear()
                        menu()
                    } else {
                        console.log('Please Enter a valid Input')
                        cont()
                    }
                }
                function checkBal(amt, mobileNumber) {
                    if (user.accountBal < amt) {
                        console.log(`Insufficient Funds`);
                        cont()
                    } else {
                        usersData.push(user.accountBal -= amt)
                        usersData.push(user.transactions.push({ Type: 'DATA TOPUP', Amount: `- #${amt} to ${mobileNumber}` }))
                        fs.writeFileSync('dataFile.json', JSON.stringify(usersData))
                        console.log(`Data TopUp to ${mobileNumber} Successful`)
                        cont()
                    }
                }
                function netProvider(network) {
                    if (network == 1) {
                        console.clear()
                        console.log('----------- MTN ----------')
                        let restart = true;
                        while (restart) {
                            var mobileNumber = prompt('Enter Your Mobile Number: ')
                            if (mobileNumber.length == 11 && mobileNumber.includes('0', 0) && mobileNumber.includes('0', 2)) {
                                console.clear()
                                console.log('Select a Data Plan ')
                                console.log('1. Data 200MB (3 days)')
                                console.log('2. Data 1GB (1 day)')
                                console.log('3. Data 1GB (7 days)')
                                console.log('4. Data 1.5GB (30 days)')
                                console.log('5. Data 2.5GB (2 days)')
                                console.log('6. Data 10GB (30 days)')
                                console.log('7. Data 120GB (60 days)')
                                var dataPlan = prompt('Select a Data Plan: ')
                                switch (dataPlan) {
                                    case '1': {
                                        console.clear()
                                        console.log('You Want To Activate 200MB for 3 days at #200');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(200, mobileNumber)
                                                shouldRestart = false;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                            }
                                        }
                                        break;
                                    }
                                    case '2': {
                                        console.clear()
                                        console.log('You Want To Activate 1GB for 1 day at #300');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(300, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }

                                        }
                                        break;
                                    }
                                    case '3': {
                                        console.clear()
                                        console.log('You Want To Activate 1GB for 7 days at #500');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(500, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                    case '4': {
                                        console.clear()
                                        console.log('You Want To Activate 1.5GB for 30 days at #1000');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(1000, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    } case '5': {
                                        console.clear()
                                        console.log('You Want To Activate 2.5GB for 2 days at #500');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(500, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    } case '6': {
                                        console.clear()
                                        console.log('You Want To Activate 10GB for 30 days at #3000');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(3000, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                    case '7': {
                                        console.clear()
                                        console.log('You Want To Activate 120GB for 60 days at #20000');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(20000, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                }
                            } else {
                                console.log('Invalid Number')
                                restart = true;
                            }
                        }
                    } else if (network == 2) {
                        console.clear()
                        console.log('----------- AIRTEL ----------');
                        let restart = true;
                        while (restart) {
                            var mobileNumber = prompt('Enter Your Mobile Number: ')
                            if (mobileNumber.length == 11 && mobileNumber.includes('0', 0) && mobileNumber.includes('0', 2)) {
                                console.clear()
                                console.log('Select a Data Plan ')
                                console.log('1. Data 100MB (2 days)')
                                console.log('2. Data 1GB (1 day)')
                                console.log('3. Data 2GB (7 days)')
                                console.log('4. Data 1.5GB (30 days)')
                                console.log('5. Data 2.5GB (2 days)')
                                console.log('6. Data 10GB (30 days)')
                                console.log('7. Data 120GB (60 days)')
                                var dataPlan = prompt('Select a Data Plan: ')
                                switch (dataPlan) {
                                    case '1': {
                                        console.clear()
                                        console.log('You Want To Activate 200MB for 2 days at #200');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(200, mobileNumber)
                                                shouldRestart = false;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                            }
                                        }
                                        break;
                                    }
                                    case '2': {
                                        console.clear()
                                        console.log('You Want To Activate 1GB for 1 day at #300');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(300, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }

                                        }
                                        break;
                                    }
                                    case '3': {
                                        console.clear()
                                        console.log('You Want To Activate 2GB for 7 days at #500');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(500, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                    case '4': {
                                        console.clear()
                                        console.log('You Want To Activate 1.5GB for 30 days at #1000');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(1000, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    } case '5': {
                                        console.clear()
                                        console.log('You Want To Activate 2.5GB for 2 days at #500');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(500, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    } case '6': {
                                        console.clear()
                                        console.log('You Want To Activate 10GB for 30 days at #3000');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(3000, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                    case '7': {
                                        console.clear()
                                        console.log('You Want To Activate 120GB for 60 days at #20000');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(20000)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                }
                            } else {
                                console.log('Invalid Number')
                                restart = true;
                            }
                        }
                    } else if (network == 3) {
                        console.clear()
                        console.log('----------- GLO ----------');
                        let restart = true;
                        while (restart) {
                            var mobileNumber = prompt('Enter Your Mobile Number: ')
                            if (mobileNumber.length == 11 && mobileNumber.includes('0', 0) && mobileNumber.includes('0', 2)) {
                                console.log('Select a Data Plan ')
                                console.log('1. Data 200MB (3 days)')
                                console.log('2. Data 1GB (1 day)')
                                console.log('3. Data 1GB (7 days)')
                                console.log('4. Data 1.5GB (30 days)')
                                console.log('5. Data 2.5GB (2 days)')
                                console.log('6. Data 10GB (30 days)')
                                console.log('7. Data 120GB (60 days)')
                                var dataPlan = prompt('Select a Data Plan: ')
                                switch (dataPlan) {
                                    case '1': {
                                        console.clear()
                                        console.log('You Want To Activate 200MB for 3 days at #200');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(200, mobileNumber)
                                                shouldRestart = false;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;

                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                            }
                                        }
                                        break;
                                    }
                                    case '2': {
                                        console.clear()
                                        console.log('You Want To Activate 1GB for 1 day at #300');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(300, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }

                                        }
                                        break;
                                    }
                                    case '3': {
                                        console.clear()
                                        console.log('You Want To Activate 1GB for 7 days at #500');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(500, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                    case '4': {
                                        console.clear()
                                        console.log('You Want To Activate 1.5GB for 30 days at #1000');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(1000, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    } case '5': {
                                        console.clear()
                                        console.log('You Want To Activate 2.5GB for 2 days at #500');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(500, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    } case '6': {
                                        console.clear()
                                        console.log('You Want To Activate 10GB for 30 days at #3000');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(3000)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                    case '7': {
                                        console.clear()
                                        console.log('You Want To Activate 120GB for 60 days at #20000');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(20000, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                }
                            } else {
                                console.log('Invalid Number')
                                restart = true;
                            }
                        }
                    } else if (network == 4) {
                        console.clear()
                        console.log('----------- 9MOBILE ----------');
                        let restart = true;
                        while (restart) {
                            var mobileNumber = prompt('Enter Your Mobile Number: ')
                            if (mobileNumber.length == 11 && mobileNumber.includes('0', 0) && mobileNumber.includes('0', 2)) {
                                console.log('Select a Data Plan ')
                                console.log('1. Data 200MB (3 days)')
                                console.log('2. Data 1GB (1 day)')
                                console.log('3. Data 1GB (7 days)')
                                console.log('4. Data 1.5GB (30 days)')
                                console.log('5. Data 2.5GB (2 days)')
                                console.log('6. Data 10GB (30 days)')
                                console.log('7. Data 120GB (60 days)')
                                var dataPlan = prompt('Select a Data Plan: ')
                                switch (dataPlan) {
                                    case '1': {
                                        console.clear()
                                        console.log('You Want To Activate 200MB for 3 days at #200');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(200, mobileNumber)
                                                shouldRestart = false;

                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;

                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;

                                            }
                                        }
                                        break;
                                    }
                                    case '2': {
                                        console.clear()
                                        console.log('You Want To Activate 1GB for 1 day at #300');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(300, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }

                                        }
                                        break;
                                    }
                                    case '3': {
                                        console.clear()
                                        console.log('You Want To Activate 1GB for 7 days at #500');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(500, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                    case '4': {
                                        console.clear()
                                        console.log('You Want To Activate 1.5GB for 30 days at #1000');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(1000, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    } case '5': {
                                        console.clear()
                                        console.log('You Want To Activate 2.5GB for 2 days at #500');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(500, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    } case '6': {
                                        console.clear()
                                        console.log('You Want To Activate 10GB for 30 days at #3000');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(3000, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                    case '7': {
                                        console.clear()
                                        console.log('You Want To Activate 120GB for 60 days at #20000');
                                        let shouldRestart = true;
                                        while (shouldRestart) {
                                            proceed = prompt('Do You Wish To Proceed? (yes/no): ').toLowerCase()
                                            if (proceed === 'yes') {
                                                checkBal(20000, mobileNumber)
                                                shouldRestart = false;
                                                break;
                                            } else if (proceed === 'no') {
                                                cont()
                                                shouldRestart = false;
                                                break;
                                            } else {
                                                console.log('Please enter yes or no')
                                                shouldRestart = true;
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                }
                            } else {
                                console.log('Invalid Number')
                                restart = true;
                            }
                        }
                    } else {
                        console.clear()
                        console.log('Please Enter a valid input')
                        netProvider()
                    }

                }
            } else {
                console.clear()
                console.log("Please enter a vaild input")
                select()
            }
        }


    }
}

