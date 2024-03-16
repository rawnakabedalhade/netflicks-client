import Joi from "joi";

const titleSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
});
const descriptionSchema = Joi.object({
  description: Joi.string().min(2).max(256).required(),
});
const yearSchema = Joi.object({
  year: Joi.number().min(1900).max(2024).required(),
});
const directorSchema = Joi.object({
  director: Joi.string().min(2).max(256).required(),
});
const categorySchema = Joi.object({
  category: Joi.array().items(Joi.string()).required(),
});
const actorsSchema = Joi.object({
  actors: Joi.array().items(Joi.string()).required(),
});
const trailerSchema = Joi.object({
  trailer: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .min(14)
    .required(),
});
const watchLinkSchema = Joi.object({
  watchLink: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .min(14)
    .required(),
});
const imageSchema = Joi.object({
  image: Joi.object().keys({
    url: Joi.string().uri({ scheme: ["http", "https"] }),
    alt: Joi.string().min(2).max(256).allow(""),
  }),
});

const validateTitleSchema = (title) => titleSchema.validate(title);
const validateDescriptionSchema = (description) =>
  descriptionSchema.validate(description);
const validateYearSchema = (year) => yearSchema.validate(year);
const validateDirectorSchema = (director) => directorSchema.validate(director);
const validateCategorySchema = (category) => categorySchema.validate(category);
const validateActorsSchema = (actors) => actorsSchema.validate(actors);
const validateTrailerSchema = (trailer) => trailerSchema.validate(trailer);
const validateWatchLinkSchema = (watchLink) =>
  watchLinkSchema.validate(watchLink);
const validateImageSchema = (image) => imageSchema.validate(image);

const validateMovieSchema = {
  title: validateTitleSchema,
  description: validateDescriptionSchema,
  year: validateYearSchema,
  director: validateDirectorSchema,
  category: validateCategorySchema,
  actors: validateActorsSchema,
  trailer: validateTrailerSchema,
  watchLink: validateWatchLinkSchema,
  image: validateImageSchema,
};

export default validateMovieSchema;
