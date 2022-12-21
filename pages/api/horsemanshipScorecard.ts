import client from '../../lib/sanity/client';

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      //this JSON arrives as a string,
      //so we turn it into a JS object with JSON.parse()
      const newScorecard = await JSON.parse(req.body);
      //then use the Sanity client to create a new todo doc
      try {
        await client
          .create({
            _type: 'horsemanshipScorecard',
            overallScore: newScorecard.overallScore,
            penalty: newScorecard.penalty,
            qualifiers: newScorecard.qualifiers,
            riderName: newScorecard.riderName,
            scoreSubtotal: newScorecard.scoreSubtotal,
          })
          .then((res) => {
            console.log(
              `Event ${newScorecard.name} was created, document ID is ${res._id}`
            );
          });
        res.status(200).json({
          msg: `Event ${newScorecard.name} created, document ID is ${res._id}`,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error, check console' });
      }

      break;

    case 'PUT':
      const updatedScorecard = await JSON.parse(req.body);
      const result = await client
        .patch(updatedScorecard.id)
        .setIfMissing({
          _type: 'horsemanshipScorecard',
          overallScore: updatedScorecard.overallScore,
          penalty: updatedScorecard.penalty,
          qualifiers: updatedScorecard.qualifiers,
          riderName: updatedScorecard.riderName,
          scoreSubtotal: updatedScorecard.scoreSubtotal,
        })
        .commit();
      res.status(200).json({
        status: result.isCompleted,
        completedAt: result.completedAt,
      });

      break;
  }
}
