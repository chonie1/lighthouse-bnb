$(() => {
  window.propertyListing = {};

  function createListing(property, isReservation) {
    return `
    <article class="property-listing">
        <section class="property-listing__preview-image">
          <img src="${property.thumbnail_photo_url}" alt="house">
        </section>
        <section class="property-listing__details">
          <h3 class="property-listing__title">${property.title}</h3>
          <ul class="property-listing__details">
            <li>number_of_bedrooms: ${property.number_of_bedrooms}</li>
            <li>number_of_bathrooms: ${property.number_of_bathrooms}</li>
            <li>parking_spaces: ${property.parking_spaces}</li>
          </ul>
          ${isReservation ? 
            `<p>${moment(property.start_date).format('ll')} - ${moment(property.end_date).format('ll')}</p>` 
            : ``}
          <footer class="property-listing__footer">
            <div class="property-listing__rating">${Math.round(property.average_rating * 100) / 100}/5 stars</div>
            <div class="property-listing__price">$${property.cost_per_night/100.0}/night</div>
          </footer>
        </section>
      </article>
    `
  }

  // const $makeResForm = $(
  //   `
  //   <form id="res_form">
  //     <div>
  //       <label for="start_date">Start Date</label>
  //       <input type="number" name="minimum_price_per_night" placeholder="Minimum Cost" id="search-property-form__minimum-price-per-night">
  //       <label for="search-property-form__maximum-price-per-night">Maximum Cost</label>
  //       <input type="number" name="maximum_price_per_night" placeholder="Maximum Cost" id="search-property-form__maximum-price-per-night">
  //     </div>
  //   </form>
  //   `
  // )

  // $('#make_res').on('click', function(e) {
  //   e.preventDefault();
  // })

  window.propertyListing.createListing = createListing;

});