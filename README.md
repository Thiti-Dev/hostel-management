## 🏨 (Hosteloga) HOSTEL MANAGEMENT
(  ) => https://hosteloga-z.web.app

## 📜 Functional

- [x] List Hotel
- [x] Search Hotel
- [x] Hotel Info
- [x] Login by using username and password.
- [x] Register
- [x] Confirm Password
- [x] Booking

## 📜 Non-Functional

- [x] Validate the duplicate email when registration
- [x] Show Available Hotel
- [x] Show the list of menu

## ✨ Additional Feature
- [x] Search the hostel ( from any keyword, will returning the matching hostel )
- [x] Update passowrd
- [x] Update details
- [x] Upload photo
- [x] Logout System
- [x] Profile system ( every user has their own profile'page , everyone can visit )
- [x] Booking history ( with filtering in user's profile )
- [x] Edit published hostel ( photo,name,desc, etc . . .)
- [x] Hostel profile ( included total booked, published date ) 
- [x] Comment syetem ( users can comment in the hostel profile )
- [x] Admin Panel ( admin can verify/un-verify a page or delete )

## ✨ Core Feature ( Non-Functional )
- [x] Return the current available capacity of the hostel from the range of the given date
- [x] Calculate the total night from the booked period
- [x] Showing the total number of people who've booked in the period of time
- [x] Showing the status of the hostel if it is verified or not

## 📃 Description
- User can book a hostel more than once ( but in the different period of time of the same hostel ) ( may still book another hostel in the same time )
- User can publish thier own hostel
- User can book the Un-verified hostel ( with thier own risks )
- User can Login by using username/email ( thier choice ) ( automatically matchs one )
```jsx
const admin_account = {
  username: "admin",
  password: "5550123"
} // for testing the admin-panel => It will be shown in the navigation bar, once you logging in as an admin
```

## 💡 Known-issues
- The website isn't reponsive to the mobile devices
- The image that just got uploaded, will automatically disappear in a while (works in local-dev but not in production[heroku]) ( haven't done the S3 yet, due the time limit )

## 🚨 Hot-fixed that I've made to make things work as expected in production
- [x] Change from using cookie to use the localStorage instead when deplpyed ( Cross origin problem (CORS) )
- [x] Using google cloud storage instead of the local storage one ( so the disappearing image problem in known-issues is gone )

=> All the changes made by hot-fixed can be found in the [stable branch](https://github.com/Thiti-Dev/hostel-management/tree/stable)

### The Backend is deployed on (  ) => https://hosteloga-api.herokuapp.com/

## 📘 API's Documentation

### Services route

| Path                               | Method   | Access       | Description                                               |
| --------------------------------------- |----------|--------------|-----------------------------------------------------------|
| `/api/services/getStatistic`            | GET      |    Public     | Get the statistic of the website including of ( TotalBooked, Account created, Total Hostel. |

### Auth route

| Path                               | Method   | Access       | Description                                               |
| --------------------------------------- |----------|--------------|-----------------------------------------------------------|
| `/api/auth/register`            | POST      |    Public     | Register the user. |
| `/api/auth/login`            | POST      |    Public     | Log the user in. |
| `/api/auth/mycredentials`            | GET      |    Private     | Get all of the current user details. |
| `/api/auth/updatepassword`            | PUT      |    Private     | Update the user password. |
| `/api/auth/updatedetails`            | PUT      |    Private     | Update the user details. |
| `/api/auth/uploadphoto`            | PUT      |    Private     | Update current user profile's picture (local storage). |
| `/api/auth/uploadphotov2`            | PUT      |    Private     | Update current user profile's picture (google cloud storage) ([stable branch](https://github.com/Thiti-Dev/hostel-management/tree/stable)). |

### Hostel route

| Path                               | Method   | Access       | Description                                               |
| --------------------------------------- |----------|--------------|-----------------------------------------------------------|
| `/api/hostels?search={search_str}`            | GET      |    Public     | Get all of the hostels in the database, if search query is found it will be searching for the most matching hostel with the {search_str}(name,desc regex finding ) . |
| `/api/hostels/`            | POST      |    Private     | Create the hostel ( photo will be stored in local storage ). |
| `/api/hostels/v2`            | POST      |    Private     | Create the hostel ( photo will be stored in google cloud stroge ) ([stable branch](https://github.com/Thiti-Dev/hostel-management/tree/stable)). |
| `/api/hostels/:hostelId/updatedetails`            | PUT      |    Private     | Update the hostel details(must be owner)(name,desc,photo ... ) ( if photo included, it will be uploading to local storage ) . |
| `/api/hostels/:hostelId/updatedetailsv2`            | PUT      |    Private     | Update the hostel details(must be owner)(name,desc,photo ... ) ( if photo included, it will be uploading to google cloud storage ) ([stable branch](https://github.com/Thiti-Dev/hostel-management/tree/stable)) . |
| `/api/hostels/:hostelSlug`            | GET      |    Public     | Get the hostel details from given slug_name. |
| `/api/hostels/:hostelId/getCapacity?start_date={date}&end_date={end_date}&total_guest={total_guest}`            | GET      |    Public     | Get the number of remain capacity of the :hostelId from the range of the given date and also response if the total guest from given query can afford the current remaining capacity or not . |

### Booking route

| Path                               | Method   | Access       | Description                                               |
| --------------------------------------- |----------|--------------|-----------------------------------------------------------|
| `/api/hostels/:hostelId/booking`            | POST      |    Private     | (Re-Routed) Book the hostel. |
| `/api/booking/myBooking`            | GET      |    Private     | Get current user booking history. |

### User route

| Path                               | Method   | Access       | Description                                               |
| --------------------------------------- |----------|--------------|-----------------------------------------------------------|
| `/api/users/:username/booking`            | GET      |    Public     | Get the given user's booking history. |
| `/api/users/:username/hostel`            | GET      |    Public     | Get the given user's published hostel. |
| `/api/users/:username`            | GET      |    Public     | Get the given user's details. |

### Comment route

| Path                               | Method   | Access       | Description                                               |
| --------------------------------------- |----------|--------------|-----------------------------------------------------------|
| `/api/hostels/:hostelId/comments`            | POST      |    Private     | (Re-Routed) Comment on a hostel. |
| `/api/hostels/:hostelId/comments`            | GET      |    Public     | (Re-Routed) Get the given hostel's comments. |

### Admin route

| Path                               | Method   | Access       | Description                                               |
| --------------------------------------- |----------|--------------|-----------------------------------------------------------|
| `/api/hostels/:hostelId/verify`            | GET      |    Private/Admin     | (Re-Routed) Verify the given hostel. |
| `/api/hostels/:hostelId/unverify`            | GET      |    Private/Admin     | (Re-Routed) De-Verify the given hostel. |
| `/api/hostels/:hostelId`            | DELETE      |    Private/Admin     | (Re-Routed) Delete the given hostel (cascade delete)(Booking,Comments that related will be deleted. |

<p align="center">
  <b>: Contact me By :</b><br>
  <a href="https://www.facebook.com/thiti.developer">Facebook</a> |
  <a href="https://www.instagram.com/thiti.mwk/">Instagram</a> |
  <a href="https://www.linkedin.com/in/thiti-mahawannakit-558791183/">LinkedIn</a>
  <br><br>
  <img src="https://media.giphy.com/media/h1u6yvxlVKmfLiSryA/giphy.gif" width="250" height="220">
</p>

