const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie Title must be a string',
    required_error: 'Movie Title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5.5),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Crime',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Thriller',
      'Sci-Fi',
      'Documentary',
      'Romance',
      'Biography'
    ]),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Genre must be an array of enum Genre'
    }
  )
})

function validateMovie(input) {
  return movieSchema.safeParse(input)
}

function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input)
}
module.exports = {
  validateMovie,
  validatePartialMovie
}
