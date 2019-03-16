package Hello;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import org.junit.Test;
import org.junit.BeforeClass;

public class MainTest {
	static ByteArrayOutputStream out = new ByteArrayOutputStream();

	@BeforeClass
	public static void exeMain() {
		System.setOut(new PrintStream(out));
		String[] args = {};
		Main.main(args);
	}

	@Test
	public void isYourAnswer() {
		assertThat(out.toString(), is("Your Answer!" + System.lineSeparator()));
	}

	@Test
	public void isNotYourAnswer() {
		assertThat(out.toString(), is(not("My Answer!" + System.lineSeparator())));
	}
}