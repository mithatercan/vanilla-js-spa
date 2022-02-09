const createStars = (rating) => {
  const stars = []

  for (let i = Math.floor(rating); i >= 0; i--) {
    stars.push(`<i class="material-icons star">star</i>`)
  }

  for (let i = 5 - Math.ceil(rating); i > 0; i--) {
    stars.push(`<i class="material-icons star">star_border</i>`)
  }

  return stars
}

export default createStars
