
#  DataFunnel

**DataFunnel** is a responsive full-stack data visualization dashboard that reads sales funnel data from a JSON file using a custom backend and presents detailed funnel metrics on the frontend using charts and tables. It includes interactive win-rate visualizations and stage-by-stage analytics using Material UI and D3.js-inspired styling.


## 🛠 Tech Stack

| Layer       | Tech Used                         |
|-------------|-----------------------------------|
| Backend     | Node.js       |
| Frontend    | React.js, Material UI (MUI)       |
| Visualization | Simulated with MUI + Custom CSS |
| Data Format | JSON                              |


## Features

-  Node.js backend serving funnel data at `/api/data`
- Responsive Material UI layout
- Two funnelChart visualizations:
  - Based on Opportunity Count
  - Based on ACV (Annual Contract Value)
-  Detailed Stage-wise Table:
  - Stage name, incoming data, lost/moved amounts, and win rate
-  Fully responsive for Desktop, Mobile, and 4K screens
-  Custom horizontal bar charts with calculated metrics


##  Project Structure

```
DataFunnel/
│
├── backend/
│   ├── server.js        # Pure Node.js server
│   └── data.json        # Raw funnel data
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.js       # Main layout and logic
│       └── components/
│           ├── DChart.js  # Funnel visualization (charts)
│           └── DTable.js  # Tabular representation
```


##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sia714/DataFunnel.git
cd DataFunnel
```


### 2. Start the Backend

```bash
cd backend
node server.js
```

The backend will start on: [http://localhost:3000](http://localhost:3000)


### 3. Run the Frontend

```bash
cd frontend
npm install
npm start
```

Visit: [http://localhost:3001](http://localhost:3001)


##  How It Works

- The backend reads `data.json` and exposes it via `/api/data`.
- The frontend fetches this data on load using `useEffect`.
- Two charts and two tables are rendered:
  - `DChart` shows bar-based progression
  - `DTable` displays numeric breakdown per stage


##  Visual Preview

>  Charts:
> - Green bars represent movement through the funnel.
> - Labels show conversion % and absolute values.

>  Tables:
> - Displays **Lost**, **Moved**, and **Win Rate %** with color-coded emphasis.


## Screenshots


