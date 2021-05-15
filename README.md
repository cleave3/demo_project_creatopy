# demo_project_creatopy

Demo project React / GraphQL/ TypeScript/ Sequelize / NodeJs

### How to use the app

1.  On the terminal cd into backend directory run
    create a .env file and add the following content
    ```
    APP_SECRET= // appsecret for jsonwebtoken
    MAIL_USER= //email user
    MAIL_PASS= //email password
    MAIL_HOST= //email host (could be your smtp server or smtp.gmail.com)
    MAIL_PORT= // smtp port (465 for gmail)
    MAIL_SENDER= // mail sender (e.g "ItemApp" <no-reply@itemapp.com>)
    ```

##### The email credentials are needed for sending email during password reset flow

```
    npm install
```

2. To Migrate the database run

```
    npm run migration
```

3. To Undo the Migration, Run

```
    npm run undo-migration
```

4.  Start the backend application (locally)

```
    npm run dev
```

#### Next

5. cd into the frontend directory
6. Install dependencies

```
    npm install
```

7. Start the frontend application

```
    npm start
```

8. Open your browser and navigate to <a href="http://localhost:3000">http://localhost:3000</a>
