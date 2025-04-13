const MessageSkeleton = () => {
	return (
	  <div className="space-y-4">
		{/* Incoming message skeleton */}
		<div className="flex gap-3 items-center">
		  <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
		  <div className="flex flex-col gap-1">
			<div className="h-4 w-40 bg-gray-300 rounded animate-pulse"></div>
			<div className="h-4 w-40 bg-gray-300 rounded animate-pulse"></div>
		  </div>
		</div>
		
		{/* Outgoing message skeleton */}
		<div className="flex gap-3 items-center justify-end">
		  <div className="flex flex-col gap-1">
			<div className="h-4 w-40 bg-gray-300 rounded animate-pulse"></div>
		  </div>
		  <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
		</div>
	  </div>
	);
  };
  
  export default MessageSkeleton;