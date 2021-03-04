$(() => {
  const $makeResForm = $(
    `
    <form id="make_res_form">
      <div>
        <label for="start_date">Start Date</label>
        <input type="date" name="start_date" placeholder="yyyy-mm-dd" id="make-res-form_start-date>
        <label for="end_date">End Date</label>
        <input type="date" name="end_date" placeholder="yyyy-mm-dd" id="make-res-form_end-date>
      </div>
    </form>
    `
    )

  window.$makeResForm = $makeResForm;

  $makeResForm.on('submit', function(e) {
    e.preventDefault();
    const data = $(this).serialize(); 
    submitReservation(data)
      .then(()=>{
        views_manager.show('makeReservation')
      })
      .catch((err) => {
        console.error(err);
        views_manager.show('makeReservation')
      })
  });
    
});