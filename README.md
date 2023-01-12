# Caesura - Poetry Remixer
Create your own art by remixing classic poems!

**Link to project:** https://caesura-poem-remixer.herokuapp.com/

![Home Page](https://i.ibb.co/WFTxLhg/Caesura2.png)

![Poem Creation Page](https://i.ibb.co/rt1Tm2F/Caesura1.png)

![Sample Poem](https://i.ibb.co/TWFvFDC/Caesura3.png)

## How It's Made:

**Tech used:** React, NodeJS, Typescript, Express, MongoDB, Passport, Material UI

The frontend client is built in React with Material UI, and the backend is built with Node.js, Express, and MongoDB. 

The frontend pulls poem data from an internal database, and then provides it to the user in batches of three. The user selects one of the three choices for each batch, and that adds the selected line to their remixed poem. When the poem is done, the app gives the user choices between 5 randomized words taken from the titles of all the selected poems. Once the user has created their remixed poem, they click the "Create" button, and the frontend sends that data to the server, which processes the request and adds the poem data to the MongoDB database. 

Users can then access a feed of all created poems, or a profile list of all the poems they have created. From the profile list, they can delete poems they have created.

Uses the Passport Local Auth strategy to manage user sessions. Users can login and signup through the login/signup pages, and the server authenticates them using the Local Auth strategy and stores their sessions in the database.

## Optimizations

I'm looking forward to expanding and optimizing this as time allows!
Upcoming features:
-(DONE)Users can comment on poems with randomized mini-poems
-(DONE)Created internal poem database
-(DONE)Users can like poems
-CSS overhaul and adding animations
-Users can remix other users' poems

## Lessons Learned:

After the database I was pulling poem data from went down, I decided to build my own, so that I could control, and therefore schedule, the app's maintenance downtime. 
This would also allow me to better manage the poems' content, because giving users the ability to mix and match words can lead to NSFW outcomes.

![Visualization of this repo](./diagram.svg)