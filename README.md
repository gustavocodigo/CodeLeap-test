# CodeLeap test
this is a test for frontend aplication.

 
<img width=100 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" />
          
**We handle all application states with Redux located at /reducers/index.js**

Instructions to build this app.
<pre>
  npm install
  npm run build
</pre>

Instructions to run as developer.
<pre>
  npm install
  npm run build
</pre>

<b>Obs: the Design was provided by CodeLeap Team.</b>
<br>
First screen located at /Pages/Signup

![image](https://github.com/gustavocodigo/CodeLeap-test/assets/108258194/c392d22e-121b-41de-87ed-76a02b9534d4)

After setting a name, the next page will be rendered located at /Pages/MainScreen

![image](https://github.com/gustavocodigo/CodeLeap-test/assets/108258194/bd6af810-f142-44db-9043-c038ee3c4f18)

The user is stored locally as cookies. If you want to logout, click on the user icon at the top right, and the following alert will appear:

![image](https://github.com/gustavocodigo/CodeLeap-test/assets/108258194/0604311b-9cb5-4fb3-a23f-564ad507cef8)

It works for several devices:

<img src="https://github.com/gustavocodigo/CodeLeap-test/assets/108258194/b5d7ce95-5b60-4ceb-803d-b29e489440bd" alt="Device 1" width="100"/> <img src="https://github.com/gustavocodigo/CodeLeap-test/assets/108258194/3fbffde6-fdb5-49af-b520-516551b49aad" alt="Device 2" width="100"/> <img src="https://github.com/gustavocodigo/CodeLeap-test/assets/108258194/e9eade6b-ea30-4e22-a46e-16e88df78756" alt="Device 3" width="100"/>

**Obs tested on my real device A30**
also using a responsive extension.

List of details for the good UI:
<ul>
  <li>✅ Fixed header</li>
  <li>✅ Text selection for posts</li>
  <li>✅ Responsive layout</li>
  <li>✅ Store user as cookie</li>
  <li>✅ Logout functionality</li>
  <li>✅ Prevent zoom for mobile</li>
 <li>✅ Prevent texts overflow</li>
</ul>


#list of actions below (obs it present in reducers):

<pre>
case 'SET_USER':
  // Set the user in the global state.

case 'HIDE_DELETE_ALERT':
  // Hide the delete alert.

case 'SHOW_DELETE_ALERT':
  // Show the delete alert for a specific post.

case 'SHOW_USER_ALERT':
  // Show the user alert.

case 'HIDE_USER_ALERT':
  // Hide the user alert.

case 'HIDE_EDIT_ALERT':
  // Hide the edit alert.

case 'SHOW_EDIT_ALERT':
  // Show the edit alert for a specific post.

case 'LOAD_POSTS':
  // Load the posts.

case 'RELOAD_POSTS':
  // Reload the posts.

case 'UPDATE_POSTS':
  // Update the posts.

case 'DELETE_POST':
  // Delete a post.

case 'EDIT_POST':
  // Edit a post.

case 'DELETE_FOCUSED_POST':
  // Delete the focused post.

case 'SEND_NEW_POST':
  // Send a new post.

case 'LOAD_NEXT_POSTS':
  // Load the next posts.

case 'LOAD_PREVIOUS_POSTS':
  // Load the previous posts.



</pre>