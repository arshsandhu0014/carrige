export function handelFormChange(event) {
  const key = event.target.id;
  const value = event.target.value;
  this.setState({ [key]: value });
}
export function toogleValue(key, event) {
  try {
    const value = event.target.value;
    this.setState({ [key]: !value });
  } catch (error) {
    console.log(key, event);
  }
}
