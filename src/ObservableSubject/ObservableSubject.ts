class ObservableSubject<ObserverData> {
  private observers: Set<(data: ObserverData) => void> = new Set();

  public attach(observer: (data: ObserverData) => void): void {
    this.observers.add(observer);
  }

  public notify(data: ObserverData) {
    this.observers.forEach((observer) => { observer(data); });
  }
}

export default ObservableSubject;
