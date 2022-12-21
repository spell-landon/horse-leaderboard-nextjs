import client from '../../lib/sanity/client';

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      //this JSON arrives as a string,
      //so we turn it into a JS object with JSON.parse()
      const newEvent = await JSON.parse(req.body);
      console.log(newEvent);
      //then use the Sanity client to create a new todo doc
      try {
        await client
          .create({
            _type: 'event',
            name: newEvent.name,
            startDate: newEvent.startDate,
            endDate: newEvent.endDate,
            region: newEvent.region,
            judges: newEvent.judges,
            riders: newEvent.riders,
            slug: newEvent.slug,
            userEmail: newEvent.user,
          })
          .then((res) => {
            console.log(
              `Event ${newEvent.name} was created, document ID is ${res._id}`
            );
          });
        res.status(200).json({
          msg: `Event ${newEvent.name} created, document ID is ${res._id}`,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error, check console' });
      }

      break;
  }
}
