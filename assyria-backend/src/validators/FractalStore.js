import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object({
      file: Yup.object().required(),
      rDistance: Yup.number().required(),
      coords: Yup.array().required(),
      filter: Yup.object(),
    });

    await schema.validate(
      {
        ...req.body,
        file: req.file,
      },
      { abortEarly: false }
    );

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
