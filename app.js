// React компонент для приложения Dogder
function App() {
  const [user, setUser] = React.useState(null); // текущий пользователь
  const [formData, setFormData] = React.useState({ name: "", age: "", bio: "", photo: "" });
  const [usersList, setUsersList] = React.useState([
    {
      id: 1,
      name: "Лаки",
      age: 2,
      bio: "Обожает мячики и бегать за голубями.",
      photo: "https://placedog.net/500?id=1",
    },
    {
      id: 2,
      name: "Бэлла",
      age: 4,
      bio: "Очень модная и любит фотографироваться.",
      photo: "https://placedog.net/500?id=2",
    },
    {
      id: 3,
      name: "Шарик",
      age: 3,
      bio: "Любит всех и каждый день радуется жизни.",
      photo: "https://placedog.net/500?id=3",
    },
  ]);
  const [matches, setMatches] = React.useState([]); // Список совпадений
  const [currentIndex, setCurrentIndex] = React.useState(0); // Текущий индекс анкеты

  // Обработчик отправки формы
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUser(formData); // Сохраняем данные пользователя в стейте
  };

  // Обработчик свайпа
  const handleSwipe = (liked) => {
    if (liked) {
      setMatches([...matches, usersList[currentIndex]]);
    }
    setCurrentIndex(currentIndex + 1); // Переход к следующей анкете
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center p-4">
      <h1 className="text-5xl font-bold mb-6">🐶 Dogder</h1>

      {/* Если анкета пользователя не создана */}
      {!user ? (
        <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-4">Создать анкету</h2>
          <input
            type="text"
            placeholder="Имя"
            className="w-full p-3 border rounded-lg mb-3"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Возраст"
            className="w-full p-3 border rounded-lg mb-3"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
          <input
            type="text"
            placeholder="Описание"
            className="w-full p-3 border rounded-lg mb-3"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
          <input
            type="url"
            placeholder="Ссылка на фото"
            className="w-full p-3 border rounded-lg mb-3"
            value={formData.photo}
            onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg">Создать</button>
        </form>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Ваша анкета</h2>
          <img src={user.photo} alt={user.name} className="w-48 h-48 object-cover rounded-full mb-4" />
          <p>{user.name}, {user.age} лет</p>
          <p>{user.bio}</p>
        </div>
      )}

      {/* Отображаем анкеты собак */}
      {usersList[currentIndex] ? (
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
          <img
            src={usersList[currentIndex].photo}
            alt={usersList[currentIndex].name}
            className="w-full h-64 object-cover"
          />
          <div className="p-4 space-y-2">
            <h2 className="text-2xl font-semibold">{usersList[currentIndex].name}</h2>
            <p className="text-gray-500 text-sm">
              {usersList[currentIndex].age} лет
            </p>
            <p>{usersList[currentIndex].bio}</p>
            <div className="flex justify-around pt-4">
              <button
                onClick={() => handleSwipe(false)}
                className="bg-red-100 hover:bg-red-200 text-red-600 p-3 rounded-full text-2xl flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
              <button
                onClick={() => handleSwipe(true)}
                className="bg-green-100 hover:bg-green-200 text-green-600 p-3 rounded-full text-2xl flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-3xl">favorite</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-semibold mb-2">
            🎉 Ваши совпадения:
          </h2>
          {matches.length > 0 ? (
            <ul>
              {matches.map((match, index) => (
                <li key={index}>{match.name}</li>
              ))}
            </ul>
          ) : (
            <p>Пока нет совпадений</p>
          )}
        </div>
      )}
    </div>
  );
}

// Рендерим компонент в div с id="root"
ReactDOM.render(<App />, document.getElementById('root'));
