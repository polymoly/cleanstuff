import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Snapshot = {
  readonly [key: string]: any;
};

interface SnapshotProviderProps {
  children: ReactNode;
  returnCallbackResponse?: boolean;
  persistStorage?: boolean;
}

type SnapshotContextProps = {
  snapshots?: Snapshot;
  takeSnapshot: (snapshot: Snapshot) => void;
};

const SnapshotContext = createContext<SnapshotContextProps>({
  snapshots: undefined,
  takeSnapshot: () => null,
});

const persistToLocalStorage = (snapshot?: Snapshot) => {
  if (snapshot) {
    try {
      window.localStorage.setItem("snapshots", JSON.stringify(snapshot));
    } catch (error) {
      throw error;
    }
  }
};

const SnapshotProvider = ({
  children,
  persistStorage = false,
  returnCallbackResponse = false,
}: SnapshotProviderProps) => {
  const [snapshots, setSnapshots] = useState<Snapshot | undefined>(undefined);

  useEffect(() => {
    if (!persistStorage || typeof window === "undefined") return;
    const snapshotKeys = Object.keys(snapshots || {});
    const storedSnapshots = window.localStorage.getItem("snapshots");
    const parsed: Snapshot = storedSnapshots ? JSON.parse(storedSnapshots) : {};

    if (snapshotKeys.length !== 0) {
      snapshotKeys.forEach((snapshotKey) => {
        if (snapshots && typeof snapshots[snapshotKey] === "function") {
          persistToLocalStorage({
            ...snapshots,
            ...parsed,
            [snapshotKey]: snapshots[snapshotKey](),
          });

          return;
        }
        persistToLocalStorage({ ...snapshots, ...parsed });
      });
    }
  }, [persistStorage, returnCallbackResponse, snapshots]);

  const takeSnapshot = (snapshot: Snapshot) => {
    const snapshotKeys = Object.keys(snapshot);

    snapshotKeys.forEach((snapshotKey) => {
      if (typeof snapshot[snapshotKey] === "function") {
        setSnapshots((prev) => ({
          ...prev,
          [snapshotKey]: returnCallbackResponse
            ? snapshot[snapshotKey]()
            : snapshot[snapshotKey],
        }));
        return;
      }
      setSnapshots((prev) => ({ ...prev, ...snapshot }));
    });
  };

  return (
    <SnapshotContext.Provider value={{ snapshots, takeSnapshot }}>
      {children}
    </SnapshotContext.Provider>
  );
};

const useTakeSnapshot = () => {
  const { takeSnapshot } = useContext(SnapshotContext);
  return takeSnapshot;
};

const useSnapshots = () => {
  const { snapshots } = useContext(SnapshotContext);

  return snapshots;
};

const usePersistSnapshots = () => {
  if (typeof window === "undefined") return;

  const snapshots = window.localStorage.getItem("snapshots");

  if (snapshots) {
    const parsedSnapshots = JSON.parse(snapshots);
    return parsedSnapshots as Snapshot;
  }
};

export { SnapshotProvider, useSnapshots, useTakeSnapshot, usePersistSnapshots };
