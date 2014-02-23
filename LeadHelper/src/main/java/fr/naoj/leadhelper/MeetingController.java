package fr.naoj.leadhelper;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.SessionAttributes;

import fr.naoj.leadhelper.model.Meeting;
import fr.naoj.leadhelper.repository.MeetingRepository;

@Controller
@RequestMapping(value={"/meeting"})
@SessionAttributes
public class MeetingController {

	@Autowired
	private MongoOperations op;
	
	@Autowired
	private MeetingRepository meetingRepository;
	
	@RequestMapping("/getMeetings")
	@ResponseBody
	public List<Meeting> getMeetings() {
		return meetingRepository.getMeetings();
	}
	
	@RequestMapping("/saveMeeting")
	@ResponseBody
	public String saveMeetingAndGetId(@RequestBody Meeting meeting) {
		return meetingRepository.saveOrUpdate(meeting);
	}
	
	@RequestMapping("/deleteMeeting")
	@ResponseStatus(value = HttpStatus.OK)
	public void deleteMeeting(@RequestBody String meetingId) {
		meetingRepository.deleteById(meetingId);
	}
	
	@ExceptionHandler
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	@ResponseBody
	public String manageException(Exception e) {
		e.printStackTrace();
		return "";
	}
}
