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
const urlSchema = Joi.object({
  url: Joi.string().min(14).allow(""),
});
const altSchema = Joi.object({
  alt: Joi.string().min(2).max(256).allow(""),
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
const validateUrl = (url) => urlSchema.validate(url);
const validateAlt = (alt) => altSchema.validate(alt);

const validateMovieSchema = {
  title: validateTitleSchema,
  description: validateDescriptionSchema,
  year: validateYearSchema,
  director: validateDirectorSchema,
  category: validateCategorySchema,
  actors: validateActorsSchema,
  trailer: validateTrailerSchema,
  watchLink: validateWatchLinkSchema,
  url: validateUrl,
  alt: validateAlt,
};

export default validateMovieSchema;
