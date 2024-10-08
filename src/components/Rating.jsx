'use client'

import { Rating as ReactRating } from '@smastrom/react-rating'

export function Rating({rating}) { 

  return <ReactRating style={{ maxWidth: 100 }} value={rating} readOnly />
}
