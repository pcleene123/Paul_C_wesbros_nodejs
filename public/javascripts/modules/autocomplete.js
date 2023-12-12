function autocomplete(input, latInput, lngInput) {
    if(!input) return; //skip this fn from running if there's no input on the page
    const dropdown = new google.maps.places.Autocomplete(input);

};

export default autocomplete;
