import moment from 'moment';

export const formatDatetime = (dateTime) => {
	return moment(dateTime).format('MMM DD YYYY, hh:mm')
}