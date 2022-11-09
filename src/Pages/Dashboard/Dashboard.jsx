import { HomeDataCard } from "../../components/Card";
import {
  ArticleIcon,
  CategoryIcon,
  UserIcon,
} from "../../components/Icon/Icon";
import Layout from "../../components/Layout/Layout";
import { Bar } from "react-chartjs-2";
import { fetchDashboardData } from "../../redux/slice​/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import {
  useAnalyticsApi,
  useAuthorize,
  useDataChart,
  useSignOut,
  useViewSelector,
} from "react-use-analytics-api";

import Treffic from "../../data/Treffic";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, []);

  return (
    <div className="flex justify-center w-auto">
      <div className="2xl:container w-full flex">
        <Layout hideRightBar={false}>
          <div className="grid grid-cols-2 gap-6">
            <HomeDataCard
              title={"Articles"}
              description={"Your total posts"}
              icon={<ArticleIcon width={65} height={65} fill={"#fff"} />}
              count={data ? data.posts : "0"}
            />
            <HomeDataCard
              title={"Videos"}
              description={"Your total videos"}
              icon={<ArticleIcon width={65} height={65} fill={"#fff"} />}
              count={data ? data.videos : "0"}
            />
            <HomeDataCard
              title={"Users"}
              description={"Your total users"}
              icon={<UserIcon width={75} height={75} fill={"#fff"} />}
              count={data ? data.users : "0"}
            />
            <HomeDataCard
              title={"Category"}
              description={"Your total category"}
              icon={<CategoryIcon width={75} height={75} fill={"#fff"} />}
              count={data ? data.categories : "0"}
            />
          </div>

          <div className="mt-14 bg-white w-full shadow-2xl drop-shadow-2xl rounded-3xl p-5">
            <RevenueByMonthsChart />
          </div>
        </Layout>
      </div>
    </div>
  );
};
export default Dashboard;

const RevenueByMonthsChart = () => {
  const { ready, gapi, authorized, error } = useAnalyticsApi();
  const [viewId, setViewId] = useState();
  const viewSelectorContainerId = "view-selector-container";
  useViewSelector(
    authorized ? gapi : undefined,
    viewSelectorContainerId,
    (viewId) => setViewId(viewId)
  );
  const query = {
    ids: viewId,
    "start-date": "28daysAgo",
    "end-date": "today",
    metrics: "ga:sessions",
    dimensions: "ga:date",
  };
  const chart = {
    container: "data-chart-container",
    type: "LINE",
    options: {
      title: "Sessions (28 Days)",
    },
  };
  useDataChart(authorized ? gapi : undefined, query, chart);

  // Workaround for API limitation - see useAuthorize docs
  const authDiv = useRef(null);
  const [authorizeCalled, setAuthorizeCalled] = useState(false);
  const hasAuthElements =
    authDiv.current && authDiv?.current?.children?.length > 0;

  const authorize = useAuthorize(gapi, {
    clientId:
      "369947259416-1gp809ven2q46ftud1t7uupgenstmfi7.apps.googleusercontent.com",
    container: "authorize-container-id",
  });
  const signOut = useSignOut(gapi);

  useEffect(() => {
    if (ready && !error && !authorizeCalled) {
      authorize();
      setAuthorizeCalled(true);
    }
  }, [ready, error, authorizeCalled, authorize]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      yAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    elements: {
      bar: {
        backgroundColor: "#D75483",
        borderRadius: 20,
        borderSkipped: "bottom",
      },
    },
  };

  const chartData = {
    labels: Treffic.revenueByMonths.labels,
    datasets: [
      {
        label: "Treffic",
        data: Treffic.revenueByMonths.data,
      },
    ],
  };
  return (
    <>
      <div>
        {!ready && <div>Loading...</div>}
        {ready && (
          <div>
            {authorized && (
              <div>
                <div style={{ marginTop: "30px" }}>
                  <div className="data-chart" id="data-chart-container" />
                </div>
                <div id={viewSelectorContainerId} />
                <div>
                  <button onClick={() => signOut()}>Sign Out</button>
                </div>
              </div>
            )}
            {!authorized && (
              <div>
                <div ref={authDiv} id="authorize-container-id"></div>
                {!hasAuthElements && <div>🔄 Refresh the page to sign in.</div>}
              </div>
            )}
          </div>
        )}
        {error && <div>{error.toString()}</div>}
      </div>
      <div className="title mb-10">Treffic by months</div>
      <div>
        <Bar options={chartOptions} data={chartData} height={`300px`} />
      </div>
    </>
  );
};
