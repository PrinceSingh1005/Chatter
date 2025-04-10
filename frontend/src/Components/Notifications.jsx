export default function Notifications() {
    return (
      <div className="w-full md:w-1/4 bg-white border-l overflow-y-auto hidden lg:block">
        <div className="p-4 border-b font-bold text-lg">Notifications</div>
        <ul className="p-4 space-y-2">
          {["@Ankita mentioned you in 'Trip to Goa'", "@Rakesh added you in group 'Study'", "@Nikhil removed you from group 'Riders'"]
            .map((note, index) => (
              <li key={index} className="text-sm text-gray-700">
                {note}
              </li>
          ))}
        </ul>
        <div className="p-4 border-t font-bold text-lg">Suggestions</div>
        <ul className="p-4 space-y-2">
          {["Abhimn Singh", "Ved Prakash", "Amit Trivedi", "Vikash Raj"].map((name, index) => (
            <li key={index} className="flex justify-between items-center text-sm">
              <span>{name}</span>
              <button className="text-purple-600 font-medium">Add</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }