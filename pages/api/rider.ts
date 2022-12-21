import client from '../../lib/sanity/client';

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      //this JSON arrives as a string,
      //so we turn it into a JS object with JSON.parse()
      const newRider = await JSON.parse(req.body);
      //then use the Sanity client to create a new todo doc
      try {
        await client
          .create({
            _type: 'rider',
            class: newRider.class,
            division: newRider.division,
            horseAge: newRider.horseAge,
            horseBreed: newRider.horseBreed,
            horseName: newRider.horseName,
            riderName: newRider.riderName,
            riderNumber: newRider.riderNumber,
            type: newRider.type,
            slug: newRider.slug,
          })
          .then((res) => {
            console.log(
              `Event ${newRider.name} was created, document ID is ${res._id}`
            );
          });
        res.status(200).json({
          msg: `Event ${newRider.name} created, document ID is ${res._id}`,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error, check console' });
      }

      break;

    case 'PUT':
      const updatedRider = await JSON.parse(req.body);
      const result = await client
        .patch(updatedRider.id)
        .setIfMissing({
          _type: 'rider',
          class: updatedRider.class,
          division: updatedRider.division,
          horseAge: updatedRider.horseAge,
          horseBreed: updatedRider.horseBreed,
          horseName: updatedRider.horseName,
          riderName: updatedRider.riderName,
          riderNumber: updatedRider.riderNumber,
          type: updatedRider.type,
          slug: updatedRider.slug,
        })
        .commit();
      res.status(200).json({
        status: result.riderName,
      });

      break;
  }
}
