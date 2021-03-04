$(() => {
  window.propertyListing = {};

  function createListing(property, isReservation, myListing) {
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
          ${isReservation && !myListing ? 
            `<p>${moment(property.start_date).format('ll')} - ${moment(property.end_date).format('ll')}</p>` 
            : ``}
          <footer class="property-listing__footer">
            <div class="property-listing__rating">${Math.round(property.average_rating * 100) / 100}/5 stars</div>
            <div class="property-listing__price">$${property.cost_per_night/100.0}/night</div>
              ${!isReservation && !myListing ? 
                `<form id="listing_${property.id}" action="/api/reservations" method="post">
                  <input type="hidden" name="property_id" value=${property.id}>
                  <button class="make_res_btn" type="button" id="make_res_btn">Make Reservation</button>
                </form>`:``}
          </footer>
        </section>
      </article>
    `
  };

  window.propertyListing.createListing = createListing;
  

  const $newResForm = $( `
    <label for="start_date">Start Date</label>
    <input type="text" name="start_date" placeholder="yyyy-mm-dd" id="make-res-form_start-date">
    <label for="end_date">End_Date</label>
    <input type="text" name="end_date" placeholder="yyyy-mm-dd" id="make-res-form_end-date">
    <button id="submit_res" type="submit">Submit</button>
  `)

  $(document).on('click','button.make_res_btn',function(e) {
    $(this).after($newResForm);
    $(this).hide();
  });

  $newResForm.parent().on('submit', function (event) {
    const elem = $newResForm.parent();
    event.preventDefault();
    views_manager.show('none');
    const data = $(this).serialize();
    submitReservation(data)
      .then(() => {
        alert('Success');
        elem.remove();
        views_manager.show('none');
        propertyListings.clearListings();
        getAllReservations()
          .then(function(json) {
            propertyListings.addProperties(json.reservations, true);
            views_manager.show('listings');
          })
          .catch(error => console.error(error));
      })
      .catch((error) => {
        console.error(error);
        views_manager.show('listings');
      })
  });
  
});