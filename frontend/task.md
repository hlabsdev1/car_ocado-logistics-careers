### Map Filter system

1. Loop through all location and show on map.
2. Then check which job fall under which location and get total length. + their content.
   1. Get all items that fall under that city
   2. get all location name then check which jobs fall under there get total num.
   3. When click on city location or zoom in change it to location items
3. Then Filter based on (currently working). Add All button to each filter
   <!-- This is category filter -->
   1. Get all city marker- Check which filter active.
   2. remove all jobs item from innerMarker and add only jobs that are in current ategory.
   3. Get total number of jobs that are in that city and assign it to text.

## Home page search filter system

Filter should based on - Job Name, address, Pin, City and category.

1.  Get all the items then create an object with it.
2.  Filter that almost correct with above filters
3.  Append card on the html
4.  If nothing pops show error card "no jobs".
