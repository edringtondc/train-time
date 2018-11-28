# train-time

 * Assuming:

   1. The first train of the day comes in at 3:00 AM.
   2. The train runs every 17 minutes
   3. The current time is 7:12 PM.
   4. There have been no delays and will be no delays.

 * Question:
   1. How many minutes away is the next train?

   minutes since from 3 am to 7:12
   divide by 17
   remainder is subtracted from 17


var timepast  = 3:00AM -19:12(in minutes)
var minutesAway = 17-(timepast%17)

