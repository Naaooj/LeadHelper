package fr.naoj.leadhelper.model;

import java.util.Date;
import java.util.List;

import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="meetings")
public class Meeting {

	@Id
	public String id;
	
	public Date meetingDate;
	
	public List<Point> meetingPoints;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@JsonSerialize(using=CustomDateSerializer.class)
	public Date getMeetingDate() {
		return meetingDate;
	}

	public void setMeetingDate(Date meetingDate) {
		this.meetingDate = meetingDate;
	}

	public List<Point> getMeetingPoints() {
		return meetingPoints;
	}

	public void setMeetingPoints(List<Point> meetingPoints) {
		this.meetingPoints = meetingPoints;
	}
}
