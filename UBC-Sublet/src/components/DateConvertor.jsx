export default function DateConvertor(prop) {
  const data = {
    startingSubletDate: prop.start,
    timePeriod: prop.timePeriod,
  };

  // Parse starting sublet date
  const startingDate = new Date(data.startingSubletDate);
  const startingMonth = startingDate.toLocaleString("default", {
    month: "long",
  });
  const startingDay = startingDate.getDate();
//   const startingYear = startingDate.getFullYear();

  // Calculate ending date
  const endingDate = new Date(startingDate);
  endingDate.setMonth(endingDate.getMonth() + parseInt(data.timePeriod));

  // Format starting and ending dates
  const endingMonth = endingDate.toLocaleString("default", { month: "long" });
  const endingDay = endingDate.getDate();
//   const endingYear = endingDate.getFullYear();

  return (
    <b>
      : {startingMonth} {startingDay} - {endingMonth} {endingDay}
    </b>
  );
}
