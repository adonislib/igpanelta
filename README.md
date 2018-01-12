# Instagram Personal Panel
To manage instagram account.

1. Autopost Schedule
2. Follow Followers Target (Cooming Soon)
3. Delete All Media (Cooming Soon)
4. Unfollow All not Followback (Cooming Soon)
5. Unfollow All Following (Cooming Soon)
6. Other ..

## Depedencies

1. AdonisJS (http://adonisjs.com)
2. Instagram Private Api (https://github.com/huttarichard/instagram-private-api)

## Setup

Install Adonis Cli globaly via npm

```bash
sudo npm i -g @adonisjs/cli
```

Git Clone Script
```bash
git clone https://github.com/ccocot/Instagram-personal-panel.git 
cd Instagram-personal-panel
npm install
```

Setting mysql in .env
```
DB_CONNECTION=mysql
DB_HOST=dbhost
DB_PORT=dbport
DB_USER=dbuser
DB_PASSWORD=dbpassword
DB_DATABASE=dbname
```

Run Migration and create Admin
```bash
adonis run:migration
adonis set:admin
```

And run the server
```
adonis serve
```
