#### the advantage of per-PR preview deploys

----- 
-creates a temporary, live copy of your app or website for every pull request.
-gives the team a unique URL to test code changes in a real environment before sending them into production.

### the risk of storing DB credentials in Vercel env vars

----
-Anyone with dashbord access can read them as a compromised Vercel account exposes the database
-Weak password or no 2FA authorisation on Verceldatabse exposed.
-Team Members and intergrations may see them and may accidentally leak.


### How would you rotate a leaked credential without downtime?

---
-To rotata a leaked database credentil without downtime, you must use a dual credential strategy that involves creating a second active password so the application can transition to the new smoothly  before deleting the leaked one.


### What happens if your hosted DB is down?

---
-When the hosted DB is down, Applictaion Errors and crashes might appear. Users will not be abl to login, sign up, submit forms or complete checkout process. On platform like Vercel, your serverless backend functions will keep trying to connect to the database until they reach their exacution limit.
