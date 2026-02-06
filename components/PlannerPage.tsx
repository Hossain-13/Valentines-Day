import { useState } from 'react';
import { Clock, Car, Zap, Utensils, Camera, Coffee, TreeDeciduous } from 'lucide-react';

type PickupOption = 'normal' | 'fast' | null;
type Restaurant = 'zolio' | 'yenzo' | null;
type Activity = 'lake' | 'photobooth' | 'dessert';

export function PlannerPage() {
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [pickupOption, setPickupOption] = useState<PickupOption>(null);
  const [restaurant, setRestaurant] = useState<Restaurant>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showForeverNo, setShowForeverNo] = useState(true);
  const [showMenuPopup, setShowMenuPopup] = useState<Restaurant | null>(null);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);

  const toggleActivity = (activity: Activity) => {
    if (activities.includes(activity)) {
      setActivities(activities.filter(a => a !== activity));
    } else if (activities.length < 2) {
      setActivities([...activities, activity]);
    } else {
      // Replace the first selected activity
      setActivities([activities[1], activity]);
    }
  };

  const getTimePeriodLabel = (time: string) => {
    if (!time) return null;
    
    const [hours] = time.split(':').map(Number);
    
    if (hours >= 5 && hours < 12) {
      return { label: 'Morning Vibes', icon: '🌅' };
    } else if (hours >= 12 && hours < 17) {
      return { label: 'Afternoon Delight', icon: '☀️' };
    } else {
      return { label: 'Evening Romance', icon: '🌙' };
    }
  };

  const formatTime = (time: string) => {
    if (!time) return '';
    
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const restaurantOptions = [
    {
      id: 'zolio' as Restaurant,
      name: 'Zolio',
      description: 'Exquisite Fine Dining',
      menuLink: 'https://www.facebook.com/share/p/19ABWncb3W/',
      emoji: '🍽️'
    },
    {
      id: 'yenzo' as Restaurant,
      name: 'Yenzo',
      description: 'Japanese Fusion',
      menuLink: 'https://www.facebook.com/share/p/17AwRbCAf4/',
      emoji: '🍱'
    },
  ];

  const activityOptions = [
    {
      id: 'lake' as Activity,
      name: 'Walk around Lake and Shorobor',
      icon: TreeDeciduous,
      color: '#FB88C1'
    },
    {
      id: 'photobooth' as Activity,
      name: 'Photobooth at Shimanto',
      icon: Camera,
      color: '#E24990'
    },
    {
      id: 'dessert' as Activity,
      name: 'Dessert at Delifrance',
      icon: Coffee,
      color: '#FED1D8'
    },
  ];

  const getActivityName = (id: Activity) => {
    return activityOptions.find(a => a.id === id)?.name || '';
  };

  const timePeriod = getTimePeriodLabel(selectedTime);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-6xl mb-2 md:mb-4 leading-tight" style={{ color: '#E24990' }}>
            Let's Plan Our Perfect Day! 💕
          </h1>
          <p className="text-xl md:text-2xl" style={{ color: '#FB88C1' }}>
            February 7th, 2026
          </p>
        </div>

        {/* Section 1: Time & Pickup */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-8 mb-6 md:mb-8" style={{ borderTop: '4px md:border-top-6 solid #E24990' }}>
          <h2 className="text-2xl md:text-3xl mb-4 md:mb-6 flex items-center gap-2 md:gap-3" style={{ color: '#E24990' }}>
            <Clock className="w-6 h-6 md:w-8 md:h-8" /> When Should I Pick You Up?
          </h2>
          
          <div className="mb-6 md:mb-8">
            <label className="block text-lg md:text-xl mb-3 md:mb-4" style={{ color: '#FB88C1' }}>
              Select Your Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 md:px-6 py-3 md:py-4 text-xl md:text-2xl rounded-xl md:rounded-2xl border-3 md:border-4 transition-all"
              style={{
                borderColor: '#E24990',
                color: '#E24990'
              }}
            />
          </div>

          {selectedTime && timePeriod && (
            <div 
              className="p-4 md:p-6 rounded-xl md:rounded-2xl border-3 md:border-4 mb-6 md:mb-8 text-center"
              style={{
                backgroundColor: '#FED1D8',
                borderColor: '#E24990',
                boxShadow: '0 4px 15px rgba(226, 73, 144, 0.3)'
              }}
            >
              <div className="text-3xl md:text-4xl mb-2">{timePeriod.icon}</div>
              <div className="text-xl md:text-2xl mb-1" style={{ color: '#E24990' }}>{timePeriod.label}</div>
              <div className="text-lg md:text-xl" style={{ color: '#FB88C1' }}>{formatTime(selectedTime)}</div>
            </div>
          )}

          <h3 className="text-xl md:text-2xl mb-3 md:mb-4" style={{ color: '#FB88C1' }}>Pickup Speed</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <button
              onClick={() => setPickupOption('normal')}
              className="p-4 md:p-6 rounded-xl md:rounded-2xl border-3 md:border-4 transition-all transform hover:scale-105"
              style={{
                backgroundColor: pickupOption === 'normal' ? '#FED1D8' : 'white',
                borderColor: pickupOption === 'normal' ? '#E24990' : '#F3DBD4',
                boxShadow: pickupOption === 'normal' ? '0 4px 15px rgba(226, 73, 144, 0.3)' : 'none'
              }}
            >
              <Car className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2" style={{ color: '#E24990' }} />
              <div className="text-lg md:text-xl" style={{ color: '#E24990' }}>Come Pick Me Up</div>
            </button>
            <button
              onClick={() => setPickupOption('fast')}
              className="p-4 md:p-6 rounded-xl md:rounded-2xl border-3 md:border-4 transition-all transform hover:scale-105"
              style={{
                backgroundColor: pickupOption === 'fast' ? '#FED1D8' : 'white',
                borderColor: pickupOption === 'fast' ? '#E24990' : '#F3DBD4',
                boxShadow: pickupOption === 'fast' ? '0 4px 15px rgba(226, 73, 144, 0.3)' : 'none'
              }}
            >
              <Zap className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2" style={{ color: '#E24990' }} />
              <div className="text-lg md:text-xl" style={{ color: '#E24990' }}>Come Pick Me Up FAST</div>
            </button>
          </div>
        </div>

        {/* Section 2: Restaurant */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-8 mb-6 md:mb-8" style={{ borderTop: '4px md:border-top-6 solid #FB88C1' }}>
          <h2 className="text-2xl md:text-3xl mb-4 md:mb-6 flex items-center gap-2 md:gap-3" style={{ color: '#E24990' }}>
            <Utensils className="w-6 h-6 md:w-8 md:h-8" /> Where Should We Dine?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {restaurantOptions.map((rest) => (
              <div
                key={rest.id}
                className="relative"
              >
                <button
                  onClick={() => setRestaurant(rest.id)}
                  className="w-full p-6 md:p-8 rounded-xl md:rounded-2xl border-3 md:border-4 transition-all transform hover:scale-105"
                  style={{
                    backgroundColor: restaurant === rest.id ? '#FED1D8' : 'white',
                    borderColor: restaurant === rest.id ? '#E24990' : '#F3DBD4',
                    boxShadow: restaurant === rest.id ? '0 4px 15px rgba(226, 73, 144, 0.3)' : 'none'
                  }}
                >
                  <div className="text-4xl md:text-5xl mb-2 md:mb-3">{rest.emoji}</div>
                  <div className="text-xl md:text-2xl mb-1 md:mb-2" style={{ color: '#E24990' }}>{rest.name}</div>
                  <div className="text-base md:text-lg" style={{ color: '#FB88C1' }}>{rest.description}</div>
                </button>
                <button
                  onClick={() => setShowMenuPopup(rest.id)}
                  className="mt-2 md:mt-3 w-full py-2 px-4 rounded-full text-white transition-all hover:opacity-90 text-base md:text-lg"
                  style={{ backgroundColor: '#FB88C1' }}
                >
                  See Menu
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Activities */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-8 mb-6 md:mb-8" style={{ borderTop: '4px md:border-top-6 solid #FED1D8' }}>
          <h2 className="text-2xl md:text-3xl mb-3 md:mb-4 flex items-center gap-2 md:gap-3" style={{ color: '#E24990' }}>
            ✨ Choose 2 Activities for Us
          </h2>
          <p className="text-base md:text-lg mb-4 md:mb-6" style={{ color: '#FB88C1' }}>Select your two favorite activities</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {activityOptions.map((activity) => {
              const Icon = activity.icon;
              const isSelected = activities.includes(activity.id);
              return (
                <button
                  key={activity.id}
                  onClick={() => toggleActivity(activity.id)}
                  className="p-4 md:p-6 rounded-xl md:rounded-2xl border-3 md:border-4 transition-all transform hover:scale-105"
                  style={{
                    backgroundColor: isSelected ? activity.color : 'white',
                    borderColor: isSelected ? '#E24990' : '#F3DBD4',
                    boxShadow: isSelected ? '0 4px 15px rgba(226, 73, 144, 0.3)' : 'none'
                  }}
                >
                  <Icon className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 md:mb-3" style={{ color: isSelected ? 'white' : '#E24990' }} />
                  <div className="text-base md:text-lg leading-tight" style={{ color: isSelected ? 'white' : '#E24990' }}>
                    {activity.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Forever Question */}
        <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-12 mb-6 md:mb-8 text-center" style={{ borderTop: '4px md:border-top-6 solid #E24990' }}>
          <h2 className="text-2xl md:text-5xl mb-6 md:mb-8 leading-tight md:leading-relaxed" style={{ color: '#E24990' }}>
            💝 Will You Be My Valentine Forever? 💝
          </h2>
          
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <button
              onClick={() => setShowSummaryPopup(true)}
              className="px-8 md:px-12 py-3 md:py-4 rounded-full text-white text-xl md:text-2xl transition-all transform hover:scale-110 hover:shadow-xl"
              style={{ backgroundColor: '#E24990' }}
            >
              YES
            </button>
            
            {showForeverNo && (
              <button
                onClick={() => setShowForeverNo(false)}
                className="px-8 md:px-12 py-3 md:py-4 rounded-full text-xl md:text-2xl transition-all transform hover:scale-105"
                style={{
                  backgroundColor: 'white',
                  color: '#E24990',
                  border: '3px solid #E24990'
                }}
              >
                NO
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Menu Popup */}
      {showMenuPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl md:text-3xl mb-3 md:mb-4 text-center" style={{ color: '#E24990' }}>
              {restaurantOptions.find(r => r.id === showMenuPopup)?.name} Menu
            </h3>
            <p className="text-base md:text-lg mb-4 md:mb-6 text-center" style={{ color: '#FB88C1' }}>
              Click below to view the menu
            </p>
            <a
              href={restaurantOptions.find(r => r.id === showMenuPopup)?.menuLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-6 rounded-full text-white text-center text-lg md:text-xl mb-3 md:mb-4 transition-all hover:opacity-90"
              style={{ backgroundColor: '#E24990' }}
            >
              Open Menu
            </a>
            <button
              onClick={() => setShowMenuPopup(null)}
              className="w-full py-3 px-6 rounded-full text-lg md:text-xl transition-all"
              style={{
                backgroundColor: 'white',
                color: '#E24990',
                border: '2px solid #E24990'
              }}
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* Summary Popup */}
      {showSummaryPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl md:rounded-3xl p-6 md:p-10 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl md:text-4xl mb-4 md:mb-6 text-center leading-tight" style={{ color: '#E24990' }}>
              💕 Valentine's Day Comes Early This Year 💕
            </h3>
            
            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
              <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-md">
                <div className="text-xs md:text-sm" style={{ color: '#FB88C1' }}>📅 DATE</div>
                <div className="text-lg md:text-xl" style={{ color: '#E24990' }}>February 7th, 2026</div>
              </div>
              
              <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-md">
                <div className="text-xs md:text-sm" style={{ color: '#FB88C1' }}>⏰ TIME</div>
                {selectedTime && timePeriod ? (
                  <div className="text-lg md:text-xl" style={{ color: '#E24990' }}>
                    {timePeriod.label} - {formatTime(selectedTime)}
                  </div>
                ) : (
                  <div className="text-lg md:text-xl italic" style={{ color: '#FB88C1' }}>
                    Please Choose Time
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-md">
                <div className="text-xs md:text-sm" style={{ color: '#FB88C1' }}>🚗 PICKUP</div>
                {pickupOption ? (
                  <div className="text-lg md:text-xl" style={{ color: '#E24990' }}>
                    {pickupOption === 'normal' ? 'Come Pick Me Up' : 'Come Pick Me Up FAST'}
                  </div>
                ) : (
                  <div className="text-lg md:text-xl italic" style={{ color: '#FB88C1' }}>
                    Please Choose Pickup Speed
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-md">
                <div className="text-xs md:text-sm" style={{ color: '#FB88C1' }}>🍽️ RESTAURANT</div>
                {restaurant ? (
                  <div className="text-lg md:text-xl" style={{ color: '#E24990' }}>
                    {restaurantOptions.find(r => r.id === restaurant)?.name}
                  </div>
                ) : (
                  <div className="text-lg md:text-xl italic" style={{ color: '#FB88C1' }}>
                    Please Choose Restaurant
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-md">
                <div className="text-xs md:text-sm" style={{ color: '#FB88C1' }}>✨ ACTIVITIES</div>
                {activities.length > 0 ? (
                  <>
                    {activities.map((activity, index) => (
                      <div key={activity} className="text-lg md:text-xl" style={{ color: '#E24990' }}>
                        {index + 1}. {getActivityName(activity)}
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-lg md:text-xl italic" style={{ color: '#FB88C1' }}>
                    Please Choose Activities (2 required)
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-center text-base md:text-lg mb-4 md:mb-6" style={{ color: '#FB88C1' }}>
              💖 Please Take Screenshot 💖
            </p>
            
            <button
              onClick={() => setShowSummaryPopup(false)}
              className="w-full py-3 px-6 rounded-full text-white text-lg md:text-xl transition-all hover:opacity-90"
              style={{ backgroundColor: '#E24990' }}
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}